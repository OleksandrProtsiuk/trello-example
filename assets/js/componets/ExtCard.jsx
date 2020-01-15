import DeleteButton from "react-trello/dist/widgets/DeleteButton";
import {
    MovableCardWrapper,
    CardTitle, CardHeader, CardRightContent, Detail, Footer,
} from 'react-trello/dist/styles/Base'
import React, {Component} from "react";
import PropTypes from "prop-types";
import ModalApp from "./modal";

class ExtCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.checkDate(this.props.expired)
        };
    }

    checkDate(expiredAt) {
        if(expiredAt !== undefined ) {
            let current = new Date();
            let expired = new Date(expiredAt);
            let daysLag = (Math.ceil(Math.abs(expired.getTime() - current.getTime()) / (1000 * 3600 * 24))) -1;

            if (current > expired) {
                if(daysLag >= 1) {
                    return {background: 'red'};
                }
            }

            if (current < expired && daysLag === 0) {
                return  {background: 'yellow'};
            }

            if(daysLag === 0) {
                return  {background: 'orange'};
            }
        }
    }

    onDelete = e => {
        this.props.onDelete();
        e.stopPropagation()
    };

    render()  {
        const {
            showDeleteButton,
            onClick,
            className,
            id,
            title,
            description,
            expired,
            cardDraggable,
        } = this.props;

        return (
            <MovableCardWrapper
                data-id={id}
                onClick={onClick}
                style={this.state.style}
                className={className}
            >
                <CardTitle draggable={cardDraggable}>
                    {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
                </CardTitle>

                <section>
                    <CardHeader>
                        <CardTitle>
                            {title}
                        </CardTitle>
                        <CardRightContent>Expired at: {expired}</CardRightContent>
                    </CardHeader>
                    <Detail>
                        {description}
                    </Detail>
                    <Footer>
                        <ModalApp
                            id={id}
                            title={title}
                            description={description}
                            expired={expired}
                        />
                    </Footer>
                </section>
            </MovableCardWrapper>
        )
    }
}

ExtCard.propTypes = {
    showDeleteButton: PropTypes.bool,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    expiredAt: PropTypes.string
};

ExtCard.defaultProps = {
    showDeleteButton: true,
    onDelete: () => {},
    style: {},
    tagStyle: {},
    title: '',
    description: '',
    className: '',
    expiredAt: ''
};

export default ExtCard;
