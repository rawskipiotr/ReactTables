import React, {useState, useEffect} from 'react'
import {Button, ButtonGroup, FormControl, FormHelperText, MenuItem, Select, TextField} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {Hobby, User} from "./One";
import {useNavigate} from "react-router-dom";
import ShortUniqueId from 'short-unique-id';

function Add(){
    //DZIESIEJSZA DATA DO INPUTU DATA URODZENIA
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    //DANE Z LOCALSTORAGE
    const parse: User[] = (JSON.parse(localStorage.getItem("usersLS")|| ""))
    const hobbiesLS: Hobby[] = (JSON.parse(localStorage.getItem("hobbies")||""))

    const [usersLS, setUsersLS] = useState<User[]>(parse);

    //ID GENERATOR
    const uid = new ShortUniqueId({length: 24});
    const uidWithTimestamp = uid.stamp(24);

    const [userAdd, setUserAdd]=useState<User>({
        id: "",
        name:"",
        lastName:"",
        email: "",
        age: 21,
        gender:"female",
        phoneNumber:"",
        address:"",
        dateOfBirth: date,
        hobbies:[]
    })
    const [select, setSelect]=useState<string[]>([]);

    useEffect(() => {
        localStorage.setItem("usersLS", JSON.stringify(usersLS));
    }, [usersLS]);

    //POWROT DO STRONY GLOWNEJ
    const navigate = useNavigate();
    const back = () => {
        navigate("/");
    }

    const handleGenderSelectChange = (e: SelectChangeEvent)=>{
        setUserAdd({...userAdd, gender: e.target.value});
    }

    function handleInputAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserAdd({ ...userAdd, age: parseInt(e.currentTarget.value) });
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setUserAdd({
            ...userAdd,
            [e.target.name]: value,
            id: uidWithTimestamp
        });
    }

    function handleFormSubmit(e: React.FormEvent<HTMLElement>){
        e.preventDefault();
        if(userAdd.name!=="" && userAdd.lastName!=="" && userAdd.email!=="" && userAdd.age !== null && select.length!==0){
            setUsersLS([
                ...usersLS, userAdd
            ]);
        }else{
            alert("FILL ALL REQUIRED FIELDS")
        }
    }

    //HANDLE SELECTA HOBBIES
    const handleHobbiesSelect = (e: SelectChangeEvent<typeof select>) => {
        const {target: { value },} = e;
        setSelect(typeof value === 'string' ? value.split(',') : value,);
        setUserAdd({ ...userAdd, hobbies: typeof value === 'string' ? value.split(',') : value, });
    };

    return <div>
        <div>ADD USER</div>
        <FormControl>
            <TextField
                fullWidth
                error={userAdd.name ===""}
                helperText={userAdd.name===""? "No Value added in this field": ""}
                label="Name"
                name="name"
                type="text"
                margin="dense"
                placeholder="Edit name"
                value={userAdd.name}
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                error={userAdd.lastName ===""}
                helperText={userAdd.lastName===""? "No Value added in this field": ""}
                label="Last Name"
                name="lastName"
                type="text"
                margin="dense"
                placeholder="Edit Last name"
                value={userAdd.lastName}
                onChange={handleInputChange}
            />
            <TextField
                style = {{width: 500}}
                error={userAdd.email ===""}
                helperText={userAdd.email===""? "No Value added in this field": ""}
                label="Email"
                name="email"
                type="text"
                margin="dense"
                placeholder="Edit email"
                value={userAdd.email}
                onChange={handleInputChange}
            />
            <Select
                label="Gender"
                name="gender"
                margin="dense"
                placeholder="Edit gender"
                value={userAdd.gender}
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
                value={userAdd.address}
                onChange={handleInputChange}
            />
            <TextField
                fullWidth
                error={userAdd.age ===null}
                helperText={userAdd.age===null? "No Value added in this field": ""}
                label="Age"
                name="age"
                type="number"
                margin="dense"
                placeholder="Edit age"
                value={userAdd.age}
                onChange={handleInputAgeChange}
            />
            <TextField
                fullWidth
                label="Date of birth"
                name="dateOfBirth"
                type="date"
                margin="dense"
                value={userAdd.dateOfBirth}
                onChange={handleInputChange}
            />
            <TextField
                label="Phone number"
                name="phoneNumber"
                type="text"
                margin="dense"
                fullWidth={true}
                placeholder="Edit phone number"
                value={userAdd.phoneNumber}
                onChange={handleInputChange}
            />
            <Select
                error={select.length===0}
                label="Hobby"
                multiple
                value={select}
                onChange={handleHobbiesSelect}
            >
                {hobbiesLS.map((hobbie) => (
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
                <Button onClick={handleFormSubmit}>ADD</Button>
                <Button onClick={back}>Back</Button>
            </ButtonGroup>
        </FormControl>
    </div>
}
export default Add;