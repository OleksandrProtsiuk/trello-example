import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    CardForm,
    CardHeader,
    CardTitle,
    CardWrapper,
} from 'react-trello/dist/styles/Base'
import {AddButton, CancelButton} from 'react-trello/dist/styles/Elements'
import EditableLabel from 'react-trello/dist/widgets/EditableLabel'

class ExtNewCardForm extends Component {
    updateField = (field, value) => {
        this.setState({[field]: value})
    };

    handleAdd = () => {
        this.props.onAdd(this.state)
    };

    render() {
        const {onCancel, t} = this.props;
        return (
            <CardForm>
                <CardWrapper>
                    <CardHeader>
                        <CardTitle>
                            <EditableLabel placeholder={t('placeholder.title')} onChange={val => this.updateField('title', val)} autoFocus />
                        </CardTitle>
                    </CardHeader>
                </CardWrapper>
                <AddButton onClick={this.handleAdd}>{t('button.Add card')}</AddButton>
                <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
            </CardForm>
        )
    }
}

ExtNewCardForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

ExtNewCardForm.defaultProps = {
};

export default ExtNewCardForm
