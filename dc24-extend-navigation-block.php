<?php

/**
 * Plugin Name:       Dc24 Extend Navigation Block
 * Description:       extend the navigation block.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            unprinted
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dc24-extend-navigation-block
 *
 * @package CreateBlock
 */

namespace dc24_extend_navigation_block;

use WP_HTML_Tag_Processor;

/**
 * Enqueue specific modifications for the block editor.
 *
 * @return void
 */
function dc24_enqueue_editor_modifications()
{
	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
	wp_enqueue_script('dc24-extend-navigation', plugin_dir_url(__FILE__) . 'build/index.js', $asset_file['dependencies'], $asset_file['version'], true);
}
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\dc24_enqueue_editor_modifications');

/**
 * Enqueue block styles
 * (Applies to both frontend and Editor)
 *
 * @since 0.1.0
 */
function dc24_enable_linked_groups_block_styles()
{
	wp_enqueue_block_style(
		'core/group',
		array(
			'handle' => 'enable-linked-groups-block-styles',
			'src'    => plugin_dir_url(__FILE__) . 'build/style.css',
			'ver'    => wp_get_theme()->get('Version'),
			'path'   => plugin_dir_path(__FILE__) . 'build/style.css',
		)
	);
}
add_action('init', __NAMESPACE__ . '\dc24_enable_linked_groups_block_styles');





/**
 * Filter button blocks for possible link attributes
 *
 * @param string $block_content The block content about to be rendered.
 * @param array  $block        The full block, including name and attributes.
 * @return string
 */
function filter_button_block_render_block($block_content, $block)
{

	if (isset($block['attrs']['animationDirection'])) {
		$p = new WP_HTML_Tag_Processor($block_content);
		// First, find the <nav> tag
		if ($p->next_tag('nav')) {
			while ($p->next_tag('div')) {
				$class_attribute = $p->get_attribute('class');
				if (strpos($class_attribute, 'wp-block-navigation__responsive-container') !== false) {
					$direction = $block['attrs']['animationDirection'];
					$p->add_class($direction);
					$block_content = $p->get_updated_html();
					break;
				}
			}
		}
	}
	if (isset($block['attrs']['animationSpeed'])) {
		$p = new WP_HTML_Tag_Processor($block_content);
		// First, find the <nav> tag
		if ($p->next_tag('nav')) {
			while ($p->next_tag('div')) {
				$class_attribute = $p->get_attribute('class');
				if (strpos($class_attribute, 'wp-block-navigation__responsive-container') !== false) {
					$speed = $block['attrs']['animationSpeed'] * 10;
					$p->add_class("duration-$speed");
					$block_content = $p->get_updated_html();
					break;
				}
			}
		}
	}
	if (isset($block['attrs']['animationEasing'])) {
		$p = new WP_HTML_Tag_Processor($block_content);
		// First, find the <nav> tag
		if ($p->next_tag('nav')) {
			while ($p->next_tag('div')) {
				$class_attribute = $p->get_attribute('class');
				if (strpos($class_attribute, 'wp-block-navigation__responsive-container') !== false) {
					$easing = $block['attrs']['animationEasing'];
					$p->add_class($easing);
					$block_content = $p->get_updated_html();
					break;
				}
			}
		}
	}

	return $block_content;
}
add_filter('render_block_core/navigation', __NAMESPACE__ . '\filter_button_block_render_block', 10, 2);
