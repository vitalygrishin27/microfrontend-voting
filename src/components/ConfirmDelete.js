import React from "react";
import {useTranslation} from "react-i18next";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";

const ConfirmDeleteCategory = ({modalOpen, setModalOpen, entityForDelete, setEntityForDelete, functionToExecute,}) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setEntityForDelete(null);
        setModalOpen(false);
    }
    const handleConfirm = () => {
        dispatch(functionToExecute(entityForDelete));
        setEntityForDelete(null);
        setModalOpen(false);
    }
    const {t} = useTranslation();

    return (
        <div>
            <Modal show={modalOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Are you sure?")}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("NO")}
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        {t("YES")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ConfirmDeleteCategory