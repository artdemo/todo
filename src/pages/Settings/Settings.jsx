import React, { useState, useEffect, useMemo } from 'react';
import { Grid, List } from '@material-ui/core';
import MainLoader from '../../components/Loaders/MainLoader';
import FrameBox from '../../components/FrameBox';
import Category from '../../components/Category';
import TextControl from '../../components/TextControl';
import IconSelect from '../../components/Selects/IconSelect';
import SubmitButton from '../../components/Buttons/SubmitButton';
import ColorSelect from '../../components/Selects/ColorSelect';
import ItemBox from '../../components/ItemBox';
import useSettingsHook from '../../hooks/useSettingsHook';

const Settings = () => {
  const {
    availableIcons,
    colors,
    isCreatePending,
    isCreateFailed,
    createCategory,
    categoryList,
    isResolved,
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

  const categoryToRender = useMemo(
    () =>
      categoryList.map(({ id, name, icon, colors, isDefault }) => (
        <ItemBox key={id}>
          <Category
            id={id}
            name={name}
            icon={icon}
            colors={colors}
            isDefault={isDefault}
            key={`${name}-${id}`}
          />
        </ItemBox>
      )),
    [categoryList],
  );

  const colorSelect = useMemo(
    () => (
      <ColorSelect
        icons={availableIcons}
        colors={colors}
        selectedColors={selectedColors}
        handleChange={(e) => setColors(e.target.value)}
      />
    ),
    [availableIcons, colors, selectedColors],
  );

  const iconSelect = useMemo(
    () => (
      <IconSelect
        icons={availableIcons}
        iconIndex={iconIndex}
        handleChange={(e) => setIconIndex(e.target.value)}
      />
    ),
    [availableIcons, iconIndex],
  );

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
    // If it's the first created category, set it as default category
    const isDefault = !categoryList.length;

    createCategory({
      name: textControlValue.trim(),
      icon: availableIcons[iconIndex],
      colors: selectedColors,
      isDefault,
    });
  };

  if (!isResolved) return <MainLoader />;

  return (
    <FrameBox>
      <form onSubmit={handleCreateCategory}>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextControl
              label="Category"
              value={textControlValue}
              handleChange={(e) => setTextControlValue(e.currentTarget.value)}
              disabled={!availableIcons.length}
            />
          </Grid>
          <Grid item xs={2}>
            {iconSelect}
          </Grid>
          <Grid item xs={2}>
            {colorSelect}
          </Grid>
          <Grid item xs={2}>
            <SubmitButton
              isLoading={isCreatePending}
              disabled={!availableIcons.length}
            >
              Add
            </SubmitButton>
          </Grid>
        </Grid>
      </form>
      <List>{categoryToRender}</List>
    </FrameBox>
  );
};

export default Settings;