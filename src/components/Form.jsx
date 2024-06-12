    import React, { useState } from 'react';
    import { TextField, Button, Select, MenuItem, InputLabel, FormHelperText, Grid } from '@mui/material';
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import axios from 'axios';

    function Form() {
        const schema = yup.object().shape({
            firstname: yup.string().required('Firstname is required'),
            lastname: yup.string().required('Lastname is required'),
            gender: yup.string().required('Gender is required'),
            score: yup.number().required('Score is required')
                .test('max', 'Maximum is 100', value => value <= 100)
                .test('min', 'Minimum is 0', value => value >= 0),
        });

        const { register, handleSubmit, formState: { errors }, reset } = useForm({
            resolver: yupResolver(schema)
        });
        const [inputData, setInpuData] = useState({ firstname: "", lastname: "", gender: "", score: "" });

        function onSubmit() {
            axios.post('http://localhost:3000/user', inputData)
                .then(res => {

                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        };
        const handleRefresh = () => {
            reset({
                firstname: '',
                lastname: '',
                gender: '',
                score: ''
            });
        };

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '50%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First name" id="firstname" {...register('firstname')} onChange={e => setInpuData({ ...inputData, firstname: e.target.value })} fullWidth />
                        {errors.firstname && <FormHelperText error>{errors.firstname.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last name" id="lastname" {...register('lastname')} onChange={e => setInpuData({ ...inputData, lastname: e.target.value })} fullWidth />
                        {errors.lastname && <FormHelperText error>{errors.lastname.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            value={inputData.gender}
                            label="Gender"
                            onChange={(e) => setInpuData({ ...inputData, gender: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value=''{...register('gender')}></MenuItem>
                            <MenuItem value='M'{...register('gender')}>Male</MenuItem>
                            <MenuItem value='F'{...register('gender')}>Female</MenuItem>
                            <MenuItem value='U'{...register('gender')}>Unknown</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Score" id="score" {...register('score')} onChange={e => setInpuData({ ...inputData, score: e.target.value })} fullWidth />
                        {errors.score && <FormHelperText error>{errors.score.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' type='submit' style={{ marginRight: '10px' }}>Add</Button>
                        <Button variant='outlined' onClick={handleRefresh}>Cancel</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Form;