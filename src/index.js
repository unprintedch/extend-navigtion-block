import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import {
	TextControl,
	RangeControl,
	SelectControl,
	PanelBody,
	PanelRow,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Icon,
} from "@wordpress/components";
import { arrowLeft, arrowRight, arrowUp, arrowDown } from "@wordpress/icons"; // Import icons from @wordpress/icons
import { __ } from "@wordpress/i18n";



/**
 * Add the attribute to the block.
 * This is the attribute that will be saved to the database.
 *
 * @param {object} settings block settings
 * @param {string} name block name
 * @returns {object} modified settings
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype
 */
addFilter("blocks.registerBlockType",
	"dc24/offcanvas-animation",
	(settings, name) => {
		if (name !== "core/navigation") {
			return settings;
		}
		return {
			...settings,
			attributes: {
				...settings.attributes,
				animationSpeed: {
					type: "string",
					default: "",
				},
				animationDirection: {
					type: "string",
					default: "",
				},
				animationEasing: {
					type: "string",
					default: "",
				},
				offcanvasHeight: {
					type: "integer",
					default: "",
				},
				offcanvasWidth: {
					type: "integer",
					default: "",
				},
			},
		};

	});

/**
* Edit component for the block.
*
* @param {object} props block props
* @returns {JSX}
*/
function Edit(props) {

	const setAnimationSpeed = (value) => {
		// Ensure the value uses a period (.) for decimals, not a comma (,)
		const sanitizedValue = value.toString().replace(',', '.');
		props.setAttributes({ animationSpeed: sanitizedValue });
	};
	const setAnimationDirection = (value) => {
		props.setAttributes({ animationDirection: value });
	};

	const easingOptions = [
		{ label: 'Linear', value: 'linear' },
		{ label: 'Ease In', value: 'ease-in' },
		{ label: 'Ease Out', value: 'ease-out' },
		{ label: 'Ease In Out', value: 'ease-in-out' },
		{ label: 'Cubic Bezier', value: 'cubic-bezier' },
	];

	const setAnimationeasing = (value) => {
		props.setAttributes({ animationEasing: value });
	};
	const setOffcanvasHeight = (value) => {
		props.setAttributes({ offcanvasHeight: value });
	};
	const setOffcanvasWidth = (value) => {
		props.setAttributes({ offcanvasWidth: value });
	};


	return (
		<InspectorControls group="styles">
			<PanelBody title={__("Nav animation")}>
				<PanelRow>
					<ToggleGroupControl
						value={props.attributes.animationDirection}
						defaultValue="left"
						label="Animation direction"
						onChange={setAnimationDirection}
					>
						<ToggleGroupControlOption
							label={(
								<>
									<Icon icon={arrowLeft} />
									{" "}
									{__("", "dc24")}
								</>
							)}
							value="left"
						/>

						<ToggleGroupControlOption
							label={(
								<>
									<Icon icon={arrowUp} />
									{" "}
									{__("", "dc24")}
								</>
							)}
							value="up"
						/>
						<ToggleGroupControlOption
							label={(
								<>
									<Icon icon={arrowRight} />
									{" "}
									{__("", "dc24")}
								</>
							)}
							value="right"
						/>
						<ToggleGroupControlOption
							label={(
								<>
									<Icon icon={arrowDown} />
									{" "}
									{__("", "dc24")}
								</>
							)}
							value="down"
						/>
					</ToggleGroupControl>
				</PanelRow>
				<PanelRow>
					<RangeControl
						__nextHasNoMarginBottom
						help="Please select how transparent you would like this."
						initialPosition={parseFloat(props.attributes.animationSpeed.toString().replace(',', '.')) || 1.0}
						label="Speed"
						max={1}
						min={0}
						step={0.1}
						onBlur={function noRefCheck() { }}
						onChange={setAnimationSpeed}
						onFocus={function noRefCheck() { }}
						onMouseLeave={function noRefCheck() { }}
						onMouseMove={function noRefCheck() { }}
					/>
				</PanelRow>

				<RangeControl
					label="Height"
					value={parseFloat(props.attributes.offcanvasHeight) || 12} // Use 'value' instead of 'initialPosition'
					onChange={setOffcanvasHeight} // Your function for handling changes
					min={0}
					max={12}
					step={1}
					help="Height of the offcanvas in grid columns"
				/>
				<RangeControl
					__nextHasNoMarginBottom
					help="width of the offcanvas in grid columns"
					initialPosition={parseFloat(props.attributes.offcanvasWidth) || 12}
					label="Width"
					max={12}
					min={0}
					step={1}
					onChange={setOffcanvasWidth}
				/>

				<PanelRow>
					<SelectControl
						label={__('Easing', 'text-domain')}
						value={props.attributes.animationEasing}
						options={easingOptions}
						onChange={setAnimationeasing}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}


/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
addFilter(
	"editor.BlockEdit",
	"dc24/offcanvas-animation",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (props.name !== "core/navigation") {
				return <BlockEdit {...props} />;
			}

			return (
				<>
					<Edit {...props} />
					<BlockEdit {...props} />
				</>
			);
		};
	})
);
