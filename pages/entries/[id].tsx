import {FC, } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Grid, CardHeader, Card, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { dbEntries } from '../../database';
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from '../../interfaces';
import { dateFunctions } from '../../utils';
import { useUpdateEntry } from '../../hooks';

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const { 
        status, 
        isNotValid, 
        inputValue, 
        onStatusChanged,
        setTouched, 
        onTextFieldChanges, 
        deleteEntryById,
        onSave, 
    } = useUpdateEntry(entry)

    return (
        <Layout title={`${inputValue.substring(0, 20)} ...`}>
            <>
                <Grid
                    container
                    justifyContent='center'
                    sx={{ marginTop: 2 }}
                >
                    <Grid item xs={12} sm={8} md={6}>
                        <Card>
                            <CardHeader
                                title={`Entrada:`}
                                subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                            />
                            <CardContent >
                                <TextField
                                    sx={{ marginTop: 2, marginBottom: 1 }}
                                    fullWidth
                                    placeholder='Nueva entrada'
                                    autoFocus
                                    multiline
                                    label='Nueva entrada'
                                    value={inputValue}
                                    onBlur={() => setTouched(true)}
                                    onChange={onTextFieldChanges}
                                    helperText={isNotValid && 'Ingrese un valor'}
                                    error={isNotValid}
                                />

                                <FormControl>
                                    <FormLabel>Estado:</FormLabel>
                                    <RadioGroup
                                        row
                                        value={status}
                                        onChange={onStatusChanged}
                                    >
                                        {
                                            validStatus.map(option => (
                                                <FormControlLabel
                                                    key={option}
                                                    value={option}
                                                    control={<Radio />}
                                                    label={capitalize(option)}
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>

                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlinedIcon />}
                                    variant='contained'
                                    fullWidth
                                    onClick={onSave}
                                    disabled={inputValue.length <= 0}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
                <IconButton sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
                    onClick={deleteEntryById}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </>

        </Layout>
    );
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;