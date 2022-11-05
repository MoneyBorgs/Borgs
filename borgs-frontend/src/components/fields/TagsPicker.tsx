import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps, createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import React from "react";
import Tag from "../../model/Tag";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";

interface TagsPickerProps
	extends Omit<AutocompleteProps<TagPickOption, true, true, true>, "renderOption" | "renderInput" | "onChange" | "options"> {
	onChange?: (
		mostRecentSelectedTags: string[]
	) => void
	tags : string[]
	defaultTags? : string[]
}

interface TagPickOption extends Tag {
	inputValue?: string,
	label?: string,
	create?: boolean
}

const filter = createFilterOptions<TagPickOption>();

export const TagsPicker = observer((props : TagsPickerProps) => {
	const [selected, setSelected] = useState<(string | TagPickOption)[]>(props.defaultTags ? tagOptionFromTagStrings(props.defaultTags) : [])
	const [options, setOptions] = useState<TagPickOption[]>([]);

	useEffect(() => {
		setOptions(tagOptionFromTagStrings(props.tags));
	}, [])

	return (
		<Autocomplete
			{...props}
			value={selected}
			multiple
			onChange={(event, newValue, reason, details) => {
				let valueList = selected;
				if (details && details.option.create && reason !== 'removeOption') {
					valueList.push({ tag: details.option.tag, create: details.option.create });
					setSelected(valueList);
				}
				else {
					setSelected(newValue);
				}
				if(props.onChange) {
					props.onChange(tagStringsFromTagOption(newValue));
				}
			}}
			filterSelectedOptions
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some((option) => inputValue === option.tag);
				if (inputValue !== '' && !isExisting) {
					filtered.push({
						tag: inputValue,
						label: `Add "${inputValue}"`,
						create: true
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			id="tags-Create"
			options={options}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.label) {
					return option.tag;
				}
				// Regular option
				if(option.tag){
					return option.tag;
				} else {
					return "";
				}
			}}
			renderOption={(props, option) => renderTagOption(props, option)}
			freeSolo
			renderInput={(params) => (
				<TextField {...params} label="Tags" />
			)}
			isOptionEqualToValue={(option, value) => option.tag === value.tag}
		/>
	);
}
)

function renderTagOption(props, tag : TagPickOption): React.ReactElement {
	return (
		<Box {...props} key={tag.transaction_id + tag.tag}>
			<Typography>{ (!tag.label)? tag.tag : tag.label }</Typography>
		</Box>
	);
}

function tagStringsFromTagOption(tags) {
	const stringTags : string[]= []
	for(const tag of tags) {
		if(typeof tag === 'string') {
			stringTags.push(tag)
		} else {
			stringTags.push(tag.tag)
		}
	}
	return stringTags;
}

function tagOptionFromTagStrings(tags) {
	const tagOptions : TagPickOption[] = [];

	for(const tagString of tags) {
		tagOptions.push({
			tag: tagString
		})
	}

	return tagOptions;
}