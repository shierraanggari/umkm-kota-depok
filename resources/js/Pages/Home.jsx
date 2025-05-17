import Layout from "../Layout/Layout";
import { Link } from "@inertiajs/react";

function Home({name}) {
    return (
        <>
            <h1 className="title"> 
                Hello, {name}
            </h1>

            <Link preserveScroll href="/" className="block title mt-[1000px]">
                {new Date().toLocaleTimeString()}
            </Link>
        </>
    )
}

Home.layout = page => <Layout children={page}/>

export default Home;