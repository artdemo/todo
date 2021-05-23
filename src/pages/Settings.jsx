import React, { useState, useEffect, useMemo } from 'react';
import { Grid, List, ListItem, TextField } from '@material-ui/core';
import { LoaderMain } from '../components/LoaderMain';
import { FrameBox } from '../components/FrameBox';
import { Category } from '../components/Category';
import { SelectIcon } from '../components/SelectIcon';
import { ButtonSubmit } from '../components/ButtonSubmit';
import { SelectColor } from '../components/SelectColor';
import { useSettingsHook } from '../hooks/useSettingsHook';

export const Settings = () => {
  const {
    colors,
    categoryList,
    availableIcons,
    isCreatePending,
    isCreateFailed,
    isResolved,
    createCategory,
  } = useSettingsHook();

  const [textControlValue, setTextControlValue] = useState('');
  const [iconIndex, setIconIndex] = useState('');
  const [selectedColors, setColors] = useState([]);

  useEffect(() => {
    // If a request ended up with error leave the form filled
    if (isCreateFailed === null || isCreateFailed === true) return;
    // Reset the form after submitting new task
    setTextControlValue('');
  }, [isCreateFailed]);

  // ==================== CATEGORY LIST ===================== //
  const categoryToRender = useMemo(
    () =>
      categoryList.map(({ id, name, icon, colors }) => (
        <ListItem key={id} disableGutters>
          <Category
            id={id}
            name={name}
            icon={icon}
            colors={colors}
            key={`${name}-${id}`}
          />
        </ListItem>
      )),
    [categoryList],
  );

  // ==================== COLOR SELECT ===================== //
  const selectColor = useMemo(
    () => (
      <SelectColor
        icons={availableIcons}
        colors={colors}
        selectedColors={selectedColors}
        handleChange={(e) => setColors(e.target.value)}
      />
    ),
    [availableIcons, colors, selectedColors],
  );

  // ==================== ICON SELECT ===================== //
  const selectIcon = useMemo(
    () => (
      <SelectIcon
        icons={availableIcons}
        iconIndex={iconIndex}
        handleChange={(e) => setIconIndex(e.target.value)}
      />
    ),
    [availableIcons, iconIndex],
  );

  // ==================== MAIN LOADER ==================== //
  if (!isResolved) return <LoaderMain />;

  // =================== SETTINGS PAGE =================== //
  const handleCreateCategory = (e) => {
    e.preventDefault();

    if (isCreatePending) return;

    const insertedText = textControlValue.trim();

    if (insertedText.length >= 15) {
      alert('Your category name should contain no more than 14 charachters');
      return;
    }
    // Prevent creating category with empty fields
    if (insertedText === '' || iconIndex === '' || !selectedColors.length) {
      alert('One of the fields is empty');
      return;
    }

    createCategory({
      name: textControlValue.trim(),
      icon: availableIcons[iconIndex],
      colors: selectedColors,
    });
  };

  return (
    <FrameBox>
      <form onSubmit={handleCreateCategory}>
        <Grid container alignContent="center" spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              variant="outlined"
              margin="none"
              size="small"
              fullWidth
              autoFocus
              label="Category"
              value={textControlValue}
              onChange={(e) => setTextControlValue(e.currentTarget.value)}
              disabled={!availableIcons.length}
            />
          </Grid>
          <Grid item sm={2} xs={4}>
            {selectIcon}
          </Grid>
          <Grid item sm={2} xs={4}>
            {selectColor}
          </Grid>
          <Grid item sm={2} xs={4}>
            <ButtonSubmit
              isLoading={isCreatePending}
              disabled={!availableIcons.length}
            >
              Add
            </ButtonSubmit>
          </Grid>
        </Grid>
      </form>
      <List>{categoryToRender}</List>
    </FrameBox>
  );
};
