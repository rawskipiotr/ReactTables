import React from 'react'
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {User, Hobby} from './One'
import {FormControl, Select, Button, ButtonGroup, TextField, MenuItem, FormHelperText} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

function Edit(){
    //PRZYPISANIE PARAMS DO ZMIENNEJ
    let params = useParams();
    const navigate = useNavigate();

    //ZALADOWANIE USERS Z LOCAL STORAGE
    const parse: User[] = (JSON.parse(localStorage.getItem("usersLS")|| ""))
    const hobbies: Hobby[] = (JSON.parse(localStorage.getItem("hobbies")||""))

    const [usersLS, setUsersLS] = useState<User[]>(parse);

    //SFILTROWANIE USERS I ZNALEZIENIE USERA WYZNACZONEGO DO EDYCJI
    const editUser: any = parse.find(user=>user.id === params.userId)

    const [currentUser, setCurrentUser] =useState<User>(editUser);
    const [updatedUser, setUpdatedUser]=useState<User>(editUser);
    const [select, setSelect]=useState(editUser.hobbies)

    useEffect(() => {
        localStorage.setItem("usersLS", JSON.stringify(usersLS));
    }, [usersLS]);

    //POWROT DO STRONY GLOWNEJ
    const back = () => {
        navigate("/");
    }
    //AKTUALIZACJA DANYCH UZYTKOWNIKA
    function handleUpdateUser(){
        const upd = usersLS.map((item)=>{
                return item.id === currentUser.id ? updatedUser : item;
            }
        )
        setUsersLS(upd);
    }
    //AKTUALIZACJA HOBBY USERA
    function handleUpdateSelect(){
        setUpdatedUser({ ...updatedUser, hobbies: select });
    }

    function handleEditFormSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        //WYMIENIONE POLA MUSZA BYC UZUPELNIONE ZEBY ZAKTUALIZOWAC FORMULARZ
        if(updatedUser.name!=="" && updatedUser.lastName!=="" && updatedUser.email!=="" && updatedUser.age !== null && select.length!==0){
            handleUpdateUser();
            handleUpdateSelect()
        }else{
            alert("FILL ALL REQUIRED FIELDS")
        }
    }

    function handleEditInputAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUpdatedUser({ ...updatedUser, age: parseInt(e.currentTarget.value) });
    }
    function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
         const value = e.target.value;
        setUpdatedUser({
                ...updatedUser,
                [e.target.name]: value
          });
        }

    function handleGenderSelectChange (e: SelectChangeEvent)  {
        setUpdatedUser({...updatedUser, gender: e.target.value});
    }

        //RESETOWANIE FORMULARZA
        function reset(e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        setUpdatedUser(editUser)
    }

    //HANDLE SELECTA HOBBIES
    const handleChangeHobbiesSelect = (e: SelectChangeEvent) => {
        const {target: { value },} = e;
        setSelect(typeof value === 'string' ? value.split(',') : value,);
        setUpdatedUser({ ...updatedUser, hobbies: typeof value === 'string' ? value.split(',') : value, });
    };
    return <div>
        <div>
            <h2>Edit User</h2>
    </div>
        <FormControl>
            <TextField
                fullWidth
                error={updatedUser.name ===""}
                helperText={updatedUser.name===""? "No Value added in this field": ""}
                label="Name"
                name="name"
                type="text"
                margin="dense"
                placeholder="Edit name"
                value={updatedUser.name}
                onChange={handleEditInputChange}
                />
            <TextField
                fullWidth
                error={updatedUser.lastName ===""}
                helperText={updatedUser.lastName===""? "No Value added in this field": ""}
                label="Last Name"
                name="lastName"
                type="text"
                margin="dense"
                placeholder="Edit Last name"
                value={updatedUser.lastName}
                onChange={handleEditInputChange}
            />
            <TextField
                style = {{width: 500}}
                error={updatedUser.email ===""}
                helperText={updatedUser.email===""? "No Value added in this field": ""}
                label="Email"
                name="email"
                type="text"
                margin="dense"
                placeholder="Edit email"
                value={updatedUser.email}
                onChange={handleEditInputChange}
            />
            <Select
                label="Gender"
                name="gender"
                margin="dense"
                placeholder="Edit gender"
                value={updatedUser.gender}
                onChange={handleGenderSelectChange}
            >
                <MenuItem
                    value={"male"}
                >{"Male"}</MenuItem>
                <MenuItem
                    value={"female"}
                >{"Female"}</MenuItem>
            </Select>
            <TextField
                fullWidth
                label="Address"
                name="address"
                type="text"
                margin="dense"
                placeholder="Edit address"
                value={updatedUser.address}
                onChange={handleEditInputChange}
            />
            <TextField
                fullWidth
                error={updatedUser.age ===null}
                helperText={updatedUser.age===null? "No Value added in this field": ""}
                label="Age"
                name="age"
                type="number"
                margin="dense"
                placeholder="Edit age"
                value={updatedUser.age}
                onChange={handleEditInputAgeChange}
            />
            <TextField
                fullWidth
                label="Date of birth"
                name="dateOfBirth"
                type="date"
                margin="dense"
                placeholder="Edit Date of birth"
                value={updatedUser.dateOfBirth}
                onChange={handleEditInputChange}
            />
            <TextField
                label="Phone number"
                name="phoneNumber"
                type="text"
                margin="dense"
                fullWidth={true}
                placeholder="Edit phone number"
                value={updatedUser.phoneNumber}
                onChange={handleEditInputChange}
            />
            <Select
                error={select.length===0}
                label="Hobby"
                multiple
                value={select}
                onChange={handleChangeHobbiesSelect}
            >
                {hobbies.map((hobbie) => (
                    <MenuItem
                        key={hobbie.id}
                        value={hobbie.id}
                    >
                        {hobbie.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{select.length===0?"No Value added in this field":""}</FormHelperText>
            <ButtonGroup fullWidth>
            <Button onClick={handleEditFormSubmit}>Update</Button>
            <Button onClick={back}>Back</Button>
            <Button onClick={reset}>Reset Form</Button>
            </ButtonGroup>
        </FormControl>
    </div>
}
export default Edit;