import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export const useDelete = ({ text } = {}) => {
    const [showRemoveConfrim, setRemoveConfrim] = useState(false)

    return {
        text: text || 'Are you sure you want to delete?',
        isOpen: showRemoveConfrim,
        onOpen: () => setRemoveConfrim(true),
        onClose: () => setRemoveConfrim(false),
    }
}

const DeleteConfrim = ({ text, isOpen, onClose, onConfirm }) => {
    return (
        <Modal
            show={isOpen}
            size='md'
            onClose={onClose}
            popup
            dismissible
        >
            <Modal.Header />
            <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='mx-auto mb-4 h-10 w-10 text-gray-400 dark:text-gray-200' />
                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{text}</h3>
                    <div className='flex justify-center gap-4'>
                        <Button
                            color='failure'
                            className='bg-rose-600 dark:bg-rose-600 enabled:hover:bg-rose-500 dark:enabled:hover:bg-rose-500'
                            onClick={() => {
                                onConfirm()
                                onClose() // Close modal after confirmation
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            color='gray'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteConfrim
