import React from 'react';
import { Modal, Box, ModalProps } from '@mui/material';

interface ModalItemProps extends Omit<ModalProps, 'children'> {
    children?: React.ReactNode;
    closeButton?: React.ReactNode;
    onClose?: () => void;
    boxClassName?: string; 
    modalClassName?: string; 
}

const ModalItem: React.FC<ModalItemProps> = ({
    closeButton,
    children,
    onClose,
    open,
    boxClassName,  
    modalClassName, 
    ...props
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={modalClassName} 
            {...props}
            sx={{
                zIndex: 1,
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'var(--backgroundopacity80)',
                        backgro8ndOpacity: '20%', 
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
                className={boxClassName} 
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