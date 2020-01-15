import React from "react";
import {Modal} from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import EditForm from "./editForm";

function EditModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit {props.title} card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditForm
                    id={props.id}
                    title={props.title}
                    description={props.description}
                    expired={props.expired}
                />
            </Modal.Body>
        </Modal>
    );
}

function ModalApp(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ButtonToolbar>
            <Button
                variant="info"
                size="sm"
                onClick={() => setModalShow(true)}
            >
                Edit
            </Button>

            <EditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={props.id}
                title={props.title}
                description={props.description}
                expired={props.expired}
            />
        </ButtonToolbar>
    );
}

export default ModalApp;