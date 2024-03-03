import React from 'react';
import {Container} from "@mui/material";
import {useAuthStore} from "../../store/useAuthStore";
import {Roles} from "../../helper/roles";
import AddVideo from "../../components/AddVideo/AddVideo";

function AdminPage() {
    const {user} = useAuthStore();
    if (user)
        return (
            <div>
                Auth as admin
                {
                    user.roles.find(value => value === Roles.ADMIN)
                }
                <div>
                    {
                        JSON.stringify(user)
                    }
                </div>
                <Container>
                    <AddVideo/>
                </Container>
            </div>
        );
    else {
        //router.push(Links.admin);
        return (
            <div>
                Auth no admin
                {
                    JSON.stringify(user)
                }
            </div>
        )
    }

}

export default AdminPage;
