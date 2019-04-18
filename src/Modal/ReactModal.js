import React from "react";
import Modal from "react-responsive-modal";
import StarRatings from 'react-star-ratings';


const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
};

export default class ReactModal extends React.Component {

    onCloseModal = () => {
        this.props.close()
    };

    render() {
        let data = this.props.data
        console.log(data)
        return (
            <div style={styles}>
                <Modal open={this.props.open} onClose={this.onCloseModal} center>
                    <h2>{data.business_name} <i className="far fa-building"></i></h2>
                    <p>{data.suggestion}</p>
                    <div></div>
                    <StarRatings
                        rating={data.stars}
                        starRatedColor="blue"
                        numberOfStars={5}
                        name='rating'
                    />
                </Modal>
            </div>
        );
    }
}

