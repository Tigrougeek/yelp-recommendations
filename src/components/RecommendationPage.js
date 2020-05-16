import React, {useEffect, useState} from "react";
import useResources from "./useResources";
import Toolbar from "@material-ui/core/Toolbar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import RestaurantCard from "./RestaurantCard";
import ShowMap from "./ShowMap";
import useWindowDimensions from "./UseWindowDimensions";

const RecommendationPage = () => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const classes = useStyles();
    const [city_id, setCity] = React.useState('ONToronto');
    const [user, setUser] = React.useState('New');

    const [restaurantList, setRestaurantList] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);
    const [rec, setRec] = React.useState('');

    const handleChangeCity = (event) => {
        setCity(event.target.value);
        setUser('New');
    };
    const handleChangeUser = (event) => {
        setUser(event.target.value);
    };


    useEffect(
        () => {
            useResources(`${city_id}-restaurants.json`).then(r => setRestaurantList(r));
            useResources(`${city_id}.json`).then(r => setRec(r));
            useResources(`${city_id}-users.json`).then(users => {
                const userByName = {};
                for(const userId of Object.keys(users)) {
                    const userName = users[userId];
                    if (userName.length > 3) {
                        userByName[userName] = userId;
                    }
                }
                let userList = [];
                for(const userName of Object.keys(userByName)) {
                    userList.push([userByName[userName], userName]);
                }
                userList.sort((e1, e2) => e1[1].localeCompare(e2[1]));

                if (userList.length > 50) {
                    const newUserList = [];
                    let counter = 0;
                    for(let i = 0; i < userList.length ; i++) {
                        counter += 50;
                        if (counter > userList.length) {
                            counter = counter - userList.length;
                            newUserList.push(userList[i]);
                        }
                    }
                    userList = newUserList;
                }

                const userById = {};
                for(const [userId, userName] of userList) {
                    userById[userId] = userName;
                }

                setUserList(userById);
            });
        },[city_id]);

    useEffect(
        () => {
        useResources('main_cities.json').then(r => setCityList(r));
        }, []);

    const recommendations = (user === "" || rec[user] == null)
        ? null
        : rec[user].map(restaurantId => restaurantList[restaurantId])
            .filter(r => r != null);

    const restaurants = (user === "" || rec[user] == null)
        ? []
        : rec[user]
            .map(restaurantId => restaurantList[restaurantId])
            .filter(r => r != null);

    const userListMinusNew = {... userList};
    delete userListMinusNew['New'];
    const sortedUserList = [['New', userList['New']]]
        .concat(
            Object.entries(userListMinusNew)
                .sort((e1, e2) => e1[1].localeCompare(e2[1]))
        );

    return (
        <div>
            <Toolbar>
                <div style={{marginLeft: 100}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={city_id}
                            onChange={handleChangeCity}
                        >
                            {
                                Object.entries(cityList).sort((e1, e2) => e1[1].localeCompare(e2[1])).map(
                                  entry => <MenuItem key={entry[0]} value={entry[0]}>{entry[1]}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user}
                            onChange={handleChangeUser}
                        >
                            {
                                sortedUserList.map(
                                        entry => <MenuItem key={entry[0]} value={entry[0]}>
                                            {entry[0] === 'New' ? '-- New User --': entry[1]}
                                        </MenuItem>
                                    )
                            }
                        </Select>
                    </FormControl>
                </div>
            </Toolbar>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{maxHeight: windowHeight - 130, overflow: 'auto'}}>
                {
                    restaurants.map(restaurant =>
                        <RestaurantCard key={restaurant.business_id} restaurant={restaurant}/>
                    )
                }
                </div>
                <div style={{flex: 1, heigth: windowHeight - 130}}>
                    <ShowMap city={city_id} recommendations={recommendations}/>
                </div>

            </div>
        </div>
    )

}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default RecommendationPage;



    // return fetch('users-test.json').then(response => response.json())
