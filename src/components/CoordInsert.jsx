import React from "react";
import { Modal, Button, Input} from 'antd';


class CoordInsert extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         visibleModal: false,
         latModal: this.props.lat, // использование переданного значения lat из пропсов
         longModal: this.props.long, // использование переданного значения long из пропсов
         zoomModal: this.props.zoom, // использование переданного значения zoom из пропсов
      };
   }

   showModal = () => {
      this.setState({
      visibleModal: true,
      });
   };

   handleOk = (e) => {
      this.props.onllzChange(this.state.latModal,this.state.longModal,this.state.zoomModal);
      this.setState({
      visibleModal: false,
      });
   };

   handleCancel = e => {
      console.log(e);
      this.setState({
      visibleModal: false,
      });
   };

   onLatChange = (e) => {
      console.log(e.target.value);
      this.setState({
      latModal: e.target.value,
      })
   }

   onLongChange = (e) => {
      console.log(e.target.value);
      this.setState({
      longModal: e.target.value,
      })
   }

   onZoomChange = (e) => {
      console.log(e.target.value);
      this.setState({
      zoomModal: e.target.value,
      })
   }

   render() {

      return (
         <div className="button-widget">
         <Button type="primary" onClick={this.showModal}>
            Open Modal
         </Button>
         <Modal
            title="Basic Modal"
            open={this.state.visibleModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
         >
            <Input type="number" addonBefore="Lat" defaultValue={this.state.latModal}
            onChange = {this.onLatChange} />
            <br /><br />
            <Input type="number" addonBefore="Long" defaultValue={this.state.longModal}
            onChange = {this.onLongChange} />
            <br /><br />
            <Input type="number" addonBefore="Zoom" defaultValue={this.state.zoomModal}
            onChange = {this.onZoomChange} />
         </Modal>
      </div>
      );
   }
};

export default CoordInsert;