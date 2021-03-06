import axios from 'axios'
import ItemForm from './ItemForm'
import gshirt from './Images/gshirt.jpg'
import gshirtB from './Images/gshirt-b.jpg'
import gshirtW from './Images/gshirt-w.jpg'
import gshirtWB from './Images/gshirt-wb.jpg'
import React from 'react'
import styled from 'styled-components'
import { ProductContext } from '../providers/ProductProvider'
import { Container, Button, Image, Header, Dropdown, Form, Modal } from 'semantic-ui-react'

// TODO: make responsive
// TODO: modify + add code to be dynamic to data when db is made
// below are size options to make demo work, will need to change for real data later



class ItemView extends React.Component {
  state = { item: {}, currentImage: 0, open: false, itemVariants: [], selection: '' }

  componentDidMount() {
    const { match: { params: { id, category_id } } } = this.props
    axios.get(`/api/categories/${category_id}/items/${id}`)
      .then(res => {
        this.setState({ item: res.data })
      })
      .catch(err => {
        console.log(err)
      })

    axios.get(`/api/items/${id}/item_variants`)
      .then(res => {
        this.setState({ itemVariants: [...res.data], });
        console.log(this.state.itemVariants)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(this.context)
  }

  updateItem = (item) => {
    this.setState({ item })
  }

  handleDelete = () => {
    const { id, category_id } = this.props.match.params
    axios.delete(`/api/categories/${category_id}/items/${id}`)
      .then(res => {
        this.props.history.push(`/categories/${category_id}`)
      })
  }

  showModal = () => this.setState({ open: !this.state.open })

  itemModal = () => {
    const { match: { params: { id, category_id } } } = this.props
    return (
      <Modal
        open={this.state.open}
        onClose={() => this.showModal()}
      >
        <Modal.Header>Update This Item</Modal.Header>
        <Modal.Content>
          <ItemForm id={id} category_id={category_id} close={this.showModal} update={this.updateItem} />
        </Modal.Content>
      </Modal>
    )
  }

  hover(e) {
    e.target.style.border = '2px solid #ececec'
    e.target.style.borderRadius = '7px'
  }

  clearHover(e) {
    e.target.style.border = 'none'
    e.target.style.borderRadius = 'none'
  }


  handleChange = (e) => {
    this.setState({ selection: e.currentTarget.id })
  }

  render() {
    // const { match: { params: { id, category_id } } } = this.props
    const { name, desc, price, image, } = this.state.item
    const { itemVariants } = this.state


    const ivList = itemVariants.map((itemVariant, i) => ({
      key: itemVariant.id,
      text: itemVariant.size,
      value: itemVariant.id,
      id: itemVariant.id
    }))

    return (
      <>
        <Container>
          <Grid>
            <div>
              {/* will need to adjust function for item.image */}
              {(() => {
                switch (this.state.currentImage) {
                  case 1: return <Image src={this.state.item.image} />
                  case 2: return <Image src={gshirtW} />
                  case 3: return <Image src={gshirtWB} />
                  default: return <Image src={gshirt} />
                  // default: return <Image src={image} />
                }
              })()}

              {/* placeholder for db images */}
              <Mini style={{}}>
                <div> <Image src={gshirt}
                  style={{ cursor: 'pointer' }}
                  onMouseOver={this.hover}
                  onMouseLeave={this.clearHover}
                  onClick={() => this.setState({ currentImage: 0 })}
                /> </div>
                <div> <Image src={gshirtB}
                  style={{ cursor: 'pointer' }}
                  onMouseOver={this.hover}
                  onMouseLeave={this.clearHover}
                  onClick={() => this.setState({ currentImage: 1 })}
                />
                </div>
                <div>
                  <Image src={gshirtW}
                    style={{ cursor: 'pointer' }}
                    onMouseOver={this.hover}
                    onMouseLeave={this.clearHover}
                    onClick={() => this.setState({ currentImage: 2 })}
                  />
                </div>
                <div>
                  <Image src={gshirtWB}
                    style={{ cursor: 'pointer' }}
                    onMouseOver={this.hover}
                    onMouseLeave={this.clearHover}
                    onClick={() => this.setState({ currentImage: 3 })}
                  />
                </div>
              </Mini>
            </div>

            {/* possiblity to make below section into second Item/Cart Form and render here instead */}

            {/* will need to figure out functions for size/quantity */}
            {/* when cart is set up */}
            {this.itemModal()}

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: '550px', width: '450px', padding: '40px' }}>

              <Header as='h1'> {name} </Header>
              <Header as='h2' style={{ color: '#A9A9A9' }}> $ {price}.00 </Header>
              <Header as='h3'> Size </Header>
              <Form>
                <Dropdown
                  placeholder='Select Size'
                  // options= {sizeOptions}
                  options={ivList}
                  selection

                  onChange={this.handleChange}
                  value={ivList.value}
                  style={{ backgroundColor: '#ececec' }}
                />
              </Form>



              <Header as='h3'> Quantity </Header>
              <Form>
                {/* might an onchange function here + in style */}
                <Form.TextArea defaultValue={1} style={{ height: '45px', width: '120px', margin: '0px 0px 20px 0px', backgroundColor: '#ececec' }} placeholder='1' />
              </Form>
              <Button size='huge' basic color='black' style={{ margin: '20px 0px 0px 0px' }}> Add to Cart </Button>

              {/* crud actions below should be hidden for regular users */}
              {/* edit item */}
              <div>
                <i style={{ cursor: 'pointer', position: 'relative', right: '-300px', bottom: '-75px' }}
                  aria-hidden="true"
                  class="icon pencil large"
                  onClick={() => this.showModal()}
                />
                {/* delete item */}
                <i
                  style={{ cursor: 'pointer', position: 'relative', right: '-325px', bottom: '-75px' }}
                  aria-hidden="true"
                  class="icon trash large"
                  onClick={this.handleDelete}
                />
              </div>
            </div>

          </Grid>

          <Desc>
            <p> {desc} </p>
          </Desc>
        </Container>
      </>
    )
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 450px);
  grid-template-rows: repeat(2, 225px);
  grid-gap: 50px;
  margin: 50px 25px 25px 50px;
`

const Mini = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: repeat(4, 40px);
  margin: 20px 20px 20px 70px;
`

const Desc = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  height: 200px;
  width: 600px;
  padding: 25px;
  margin: 100px 10px 10px 250px;
`
ItemView.contextType = ProductContext
export default ItemView