import React, { useMemo, useEffect, useState } from "react";
import { format } from 'date-fns';
import { Grid, TextField } from "@material-ui/core";
import { ButtonSubmit } from './ButtonSubmit';
import { SelectCategory } from './SelectCategory';
import { useTaskInputHook } from '../hooks/useTaskInputHook';

export const TaskInput = () => {
    const {
        createTask,
        createPendingStatus,
        createFailedStatus,
        categoryListFlatted,
    } = useTaskInputHook();

    const [textControlValue, setTextControlValue] = useState('');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

    useEffect(() => {
        // If a request end up with error leave the form filled
        if (createFailedStatus === null || createFailedStatus === true) return;
        // Reset the form after submitting new task
        setTextControlValue('');
    }, [createFailedStatus]);

    const selectCategory = useMemo(
        () => (
            <SelectCategory
                categoryList={categoryListFlatted}
                index={selectedCategoryIndex}
                handleChange={(e) => setSelectedCategoryIndex(e.target.value)}
            />
        ),
        [categoryListFlatted, selectedCategoryIndex],
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (textControlValue.trim() === '' || createPendingStatus) return;

        const { id: categoryId, color } = categoryListFlatted[
            selectedCategoryIndex
        ];

        createTask({
            name: textControlValue.trim(),
            isCompleted: false,
            isFavorite: false,
            categoryId,
            color,
            date: format(new Date(), 'yyyy-MM-dd'),
        });
    };

    return <form onSubmit={handleSubmit}>
        <Grid container alignContent="center" spacing={2}>
            <Grid item sm={7} xs={12}>
                <TextField
                    variant="outlined"
                    margin="none"
                    size="small"
                    fullWidth
                    autoFocus
                    label="Task"
                    value={textControlValue}
                    onChange={(e) => setTextControlValue(e.currentTarget.value)}
                />
            </Grid>
            <Grid item sm={2} xs={6}>
                {selectCategory}
            </Grid>
            <Grid item sm={3} xs={6}>
                <ButtonSubmit isLoading={createPendingStatus}>Add</ButtonSubmit>
            </Grid>
        </Grid>
    </form>
}