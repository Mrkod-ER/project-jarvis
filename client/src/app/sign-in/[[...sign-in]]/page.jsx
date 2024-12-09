import { SignIn } from "@clerk/nextjs";

export default function Page(){
    return (
        <div class="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div class=" text-white p-4"><SignIn/></div>
      </div>
    )
}