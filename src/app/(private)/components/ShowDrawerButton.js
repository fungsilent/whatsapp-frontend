import { Button } from "flowbite-react"
import { CiEdit } from "react-icons/ci"

const ShowDrawerButton = ({ onClick }) => {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <Button
                onClick={onClick}
                className="rounded-full w-10 aspect-square bg-slate-600 mt-auto cursor-pointer"
            >
                <CiEdit className="h-6 w-6"/>
            </Button>
        </div>
    )
}

export default ShowDrawerButton
