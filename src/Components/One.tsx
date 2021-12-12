import React from 'react';
import {useState, useEffect} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";
import Typography from '@mui/material/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import users from '../Data/users.json'
import hobbies from  '../Data/hobbies.json'

//INTERFACE DO HOBBIES
export interface Hobby {
    id: string;
    name: string
}

//INTERFACE DO USERS
export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    age: number;
    gender: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    hobbies: string[];
}

function One () {

    const navigate = useNavigate();
    const [select, setSelect] =useState<any[]>([])
    const [currId, setCurrId] =useState<string>("")
    const [currName, setCurrName]=useState<string>("")
    const [open, setOpen] = useState<boolean>(false);

    //ZALADOWANIE HOBBIES.JSON DO OTYPOWANEJ ZMIENNEJ
    const hobbiesJson: Hobby[] = hobbies;

    //ZALADOWANIE OTYPOWANEJ ZMIENNEJ Z HOBBIES.JSON DO LOCAL STORAGE
    localStorage.setItem("hobbies", JSON.stringify(hobbiesJson));

    //ARRAY Z HOBBIES Z LOCAL STORAGE
    const hobbiesLS: Hobby[] = (JSON.parse(localStorage.getItem("hobbies")|| ""))

    //ZALADOWANIE USERS.JSON DO OTYPOWANEJ ZMIENNEJ
    const usersJson: User[] = users;

    //USE STATE USERS Z LOCAL STORAGE
    const [usersLS, setUsersLS] = useState<User[]>(() => {
        const savedUsers = localStorage.getItem("usersLS");
        // JESLI SA ZAPISANA LISTA USERS W LOCAL STORAGE TO JA ZWROC
        if (savedUsers) {
            //JESLI LOCAL STORAGE JEST PUSTY UTWORZ NA PODSTAWIE PLIKU JSON
            return JSON.parse(savedUsers);
        } else {
            return usersJson;
        }
    });

    //ZALADOWANIE USERS.JSON DO LOCAL STORAGE
    useEffect(() => {
        localStorage.setItem("usersLS", JSON.stringify(usersLS));
    }, [usersLS]);

    //FUNKCJA DO USUWANIA UZYTKOWNIKA Z LOCAL STORAGE NA PODSTAWIE PRZEKAZANEGO ID
    function deleteUser(id: string) {
        //WYSZUKAJ USERA PO ODPOWIEDNIM ID
        const removeUser: User[] = usersLS.filter((user) => {
            //ZWROC ARRAY TYLKO Z UZYTKOWNIKAMI O INNYM ID NIZ PODANE
            return user.id !== id;
        });
        //UAKTUALNIJ STAN NA PODSTAWIE NOWEJ ARRAY
        setUsersLS(removeUser);
    }
    //OTWARCIE OKNA DIALOG DO POTWIERDZENIA USUNIECIA
    const handleClickToOpen = () => {
        setOpen(true);
    };
    //ZAMKNIECIE OKNA DIALOG DO POTWIERDZENIA USUNIECIA
    const handleToClose = () => {
        setOpen(false);
    };
    //USUNIECIE POTWIERDZONEGO UZYTKOWNIKA I ZAMKNIECIE OKNA DIALOGOWEGO
    const confirmedDelete = () => {
        deleteUser(currId)
        handleToClose()
    }
    //OTWARCIE NOWEGO OKNA DO DODANIA NOWEGO UZYTKOWNIKA
    const handleAdd = () => {
        navigate('/add');
    }
    //USUNIECIE WSZYSTKICH ZAZNACZONYCH UZYTKOWNIKOW Z SELECT
    const deleteAll = () => {
        let newUsers = usersLS;
        let newSelect = select;
        //WYSZUKANIE UZYTKOWNIKA Z USERSLS PASUJACEGO DO ID Z SELECT I USUNIECIE GO Z USERSLS I SELECT
        const may = () =>{
            let id = newSelect[0]
            newSelect = newSelect.filter(item =>item !==id)
            newUsers = newUsers.filter(item =>item.id !==id)
        }
        //POWTARZAC AZ SELECT BEDZIE PUSTY
        for(let i=0; i < select.length; i++) {
            may()
        }
        //UPDATE STANU PO USUNIECIU
        const update = () =>{
            setSelect(newSelect)
            setUsersLS(newUsers)
        }
        update()
        //ZAMKNIECIE OKNA DIALOGOWEGO
        setOpen(false);
        }

    //TABELA - WYTYCZNE
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            hide: true
        },
        {
            field: 'name',
            headerName: 'First name',
            width: 100,
            sortable: false,
            filterable: false,

        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'string',
            width: 250,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            sortable: false,
            filterable: false,
            width: 100,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 60,
        },
        {
            field: 'hobby',
            headerName: 'Hobby',
            sortable: false,
            width: 150,
            renderCell: (params)=>{
                const hobb = params.row.hobbies

                //WYCIAGNIECIE ID HOBBIES Z USERS Z POLA HOBBIES I PRZESZUKANIE ARRAY Z HOBBIES I DOPASOWANIE PASUJACYCH I DODANIE ICH DO NOWEJ ARRAY Z NAZWAMMI HOBBY
                const hobbiesNames: any = []
                for(let j=0; j<hobb.length; j++){
                    for(let i=0; i<hobbiesLS.length; i++){
                        if(hobb[j]===hobbiesLS[i].id){
                            hobbiesNames.push(hobbiesLS[i].name)
                        }else{
                        }
                    }
                }
                //WYSWIETLENIE NAZW HOBBY DO TABELI MOZNA POPRAWIC LEPSZY KEY
                const HobbyNames = ()=> {
                    return hobbiesNames.map((item: string, index: number) => <div key={index}>
                        <Typography >
                            {item}{index < hobbiesNames.length - 1 ? ", " : ""}
                        </Typography>
                    </div>)
                }
                return <div>
                    <HobbyNames />
                </div>
            }
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of birth',
            width: 150,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone number',
            sortable: false,
            width: 150,
            filterable: false,
        },
        {
            field: 'details',
            headerName: 'Details',
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: (params) =>{
                const id: string = params.row.id
                const name: string = params.row.name+" "+params.row.lastName
                //OTWARCIE OKNA Z POTWIERDZENIE USUNIECIA I PRZYPISANIE ID DO USUNIECIA
                const handleDeleteButton = () => {
                    setCurrId(id)
                    setCurrName(name)
                    handleClickToOpen()
                };
                //OTWARCIE NOWEGO OKNA DO EDYTOWANIA KLIKNIETEGO UZYTKOWNIKA
                const handleEditButton = ()=> {
                    navigate(`/edit/${id}`);
                }
                return <div><Button onClick={handleEditButton}>Edit</Button>
                    <Button onClick={handleDeleteButton}>Delete</Button></div>
            }
        },
    ];


    return <div className="App">
        <Button onClick={handleAdd}>
            ADD NEW USER
        </Button>
        <Button
            onClick={handleClickToOpen}
        >DELETE SELECTED USERS</Button>
        <div>
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={usersLS}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                rowHeight={100}
                checkboxSelection
                disableSelectionOnClick
                //DODNIE ZAZNACZONYCH USEROW DO USUNIECIA DO SELECT
                onSelectionModelChange={(newSelection) => {
                    setSelect(newSelection);
                }}
            />
        </div>
        </div>
        <Dialog open={open} onClose={handleToClose}>
            <DialogTitle>{"Do you want to delete the following users?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {select.length > 0 ? "" : currName}
                    {select.map((item, index)=>{
                        const findUser: any = usersLS.find(user=>user.id === item)
                        return <span>{findUser.name}{" "}{findUser.lastName}{index < select.length - 1 ? ", " : ""}</span>
                    })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {select.length > 0 ?  <Button onClick={deleteAll}
                                              color="primary" autoFocus>
                    Delete All
                </Button> : <Button onClick={confirmedDelete}>Delete</Button>}
                <Button onClick={handleToClose}
                        color="primary" autoFocus>
                    Cancel
                </Button>

            </DialogActions>
        </Dialog>
        </div>
}

export default One;