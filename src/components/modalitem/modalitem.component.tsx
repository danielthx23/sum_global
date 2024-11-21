import React from 'react';
import { Modal, Box, ModalProps, SlotProps } from '@mui/material';

interface ModalItemProps extends Omit<ModalProps, 'children'> {
    children?: React.ReactNode;
    closeButton?: React.ReactNode;
    onClose?: () => void;
    boxClassName?: string;  // Custom class for Box
    modalClassName?: string; // Custom class for Modal
}

const ModalItem: React.FC<ModalItemProps> = ({
    closeButton,
    children,
    onClose,
    open,
    boxClassName,   // Use this prop for Box class
    modalClassName, // Use this prop for Modal class
    ...props
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={modalClassName}  // Add className to Modal
            {...props}
            sx={{
                zIndex: 1,
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'var(--backgroundopacity80)',
                        backgro8ndOpacity: '20%', // Set your backdrop color here
                    },
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                className={boxClassName} // Add className to Box
            >
                {children}

                {closeButton && (
                    <Box
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 20,
                            cursor: 'pointer',
                        }}
                    >
                        {closeButton}
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ModalItem;