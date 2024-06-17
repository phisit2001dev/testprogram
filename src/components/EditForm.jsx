import React, { useEffect, useState } from 'react';
import { Button, TextField, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditForm() {
  const schema = yup.object().shape({
    firstname: yup.string().required('Firstname is required'),
    lastname: yup.string().required('Lastname is required'),
    gender: yup.string().required('Gender is required'),
    score: yup.number().required('Score is required')
      .max(100, 'Maximum is 100')
      .min(0, 'Minimum is 0'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const { id } = useParams();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    score: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${id}`)
      .then(res => {
        setData(res.data);
        reset(res.data);
      })
      .catch(err => console.log(err));
  }, [id, reset]);

  const onSubmit = (formData) => {
    axios.put(`http://localhost:3000/user/${id}`, formData)
      .then(res => {
        console.log();
      })
      .catch(err => console.log(err));
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
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="firstname"
          id="firstname"
          {...register('firstname')}
          value={data.firstname}
          onChange={e => setData({ ...data, firstname: e.target.value })}
        />
        {errors.firstname && <FormHelperText error>{errors.firstname.message}</FormHelperText>}

        <TextField
          label="lastname"
          id="lastname"
          {...register('lastname')}
          value={data.lastname}
          onChange={e => setData({ ...data, lastname: e.target.value })}
        />
        {errors.lastname && <FormHelperText error>{errors.lastname.message}</FormHelperText>}

        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          {...register('gender')}
          value={data.gender}
          onChange={e => setData({ ...data, gender: e.target.value })}
        >
          <MenuItem value=''></MenuItem>
          <MenuItem value='M'>Male</MenuItem>
          <MenuItem value='F'>Female</MenuItem>
          <MenuItem value='U'>Unknown</MenuItem>
        </Select>
        {errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}

        <TextField
          label="score"
          id="score"
          type="number"
          {...register('score')}
          value={data.score}
          onChange={e => setData({ ...data, score: e.target.value })}
        />
        {errors.score && <FormHelperText error>{errors.score.message}</FormHelperText>}

        <Button variant='contained' type='submit'>Edit</Button>
        <Button variant='outlined' onClick={handleRefresh}>Cancel</Button>
      </form>
    </div>
  );
}

export default EditForm;
