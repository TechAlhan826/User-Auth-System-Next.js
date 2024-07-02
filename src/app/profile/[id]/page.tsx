export default function userProfile({params}:any){
    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="m-4 text-xl">Profile</h1>
            <hr />
            <p className="text-2xl">User Profile <span className="p-2 rounded bg-green-500">{params.id}</span></p>
            </div>
    );
}