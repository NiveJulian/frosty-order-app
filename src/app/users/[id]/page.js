"use client"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/UserTabs";

export default function EditUserPage() {
    const {loading, data} = useProfile();

    if(loading){
        return 'Cargando el usuario...'
    }

    if(!data.admin){
        return 'No eres admin'
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">

            </div>
        </section>
    )
};
