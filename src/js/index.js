 define(['react','react-bootstrap/Panel',
 	'react-bootstrap/Grid',
 	'react-bootstrap/Row',
 	'react-bootstrap/Col',
 	'react-bootstrap/Input',
 	'react-bootstrap/Button',
 	'react-bootstrap/ListGroup',
 	'react-bootstrap/ListGroupItem',
 	'react-bootstrap/ButtonGroup',
 	'zepto',
 	'./signature'
 	],function(React, Panel,Grid, Row, Col, Input, Button, ListGroup, ListGroupItem, ButtonGroup, $, Signature){


  	var PageLayout = React.createClass({

	    getInitialState: function() {
	    	var self = this;
	    	$.ajax({
				url:'http://my.dper.com/common/personal?_'+ new Date().getTime(),
				success: function(data){
					self.setState({workId: data.msg.serialNumber, workName: data.msg.name});
				}
			});
			
	    	return {
	    		mobileDis: false,
	    		departmentDis: false,
	    		telDis: false,
	    	 signatureData:{

	    	} }
		},
		handleChangeWorkId: function(event) {
			var self = this;
		    this.setState({workId : event.target.value});
		    $.ajax({
				url:'http://my.dper.com/search/employee-profile?serialNumber='+event.target.value+'&_='+ new Date().getTime(),
				success:function(data){
					self.setState({
						signatureData:{
							realName:data.msg.realName,
							className:'signature signature-light',
							mobile: self.state.mobileDis ? data.msg.mobileNumber : null,
							department: self.state.departmentDis ? data.msg.department : null,
							email: data.msg.email,
							tel: self.state.telDis ? data.msg.officeNumber : null
						}
					});
				}
			})


		},

		handleChangeType: function(event, link){
			var self = this;
			var target = $('[class=list-group]').find('a[href="#'+event+'"]');
			target.toggleClass('active');
			if(target.hasClass('active')){
				this.state[event+'Dis'] = true;
			}else{
				this.state[event+'Dis'] = false;
			}
			$.ajax({
				url:'http://my.dper.com/search/employee-profile?serialNumber='+this.state.workId+'&_='+ new Date().getTime(),
				success:function(data){
					self.setState({
						signatureData:{
							realName:data.msg.realName,
							className:'signature signature-light',
							mobile: self.state.mobileDis ? data.msg.mobileNumber : null,
							department: self.state.departmentDis ? data.msg.department : null,
							email: data.msg.email,
							tel: self.state.telDis ? data.msg.officeNumber : null
						}
					});
				}
			})
		},
		render: function() {
			return (

				<Grid>
			        <Row className="show-grid">
			          <Col xs={12} md={4}>
						   <Panel header="选择签名档配置">
					        	<form className="form-horizontal">
							      <Input type="text" label="工号" name="workId" onChange={this.handleChangeWorkId} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
									<ListGroup  onClick={this.handleChangeType}>
								      <ListGroupItem eventKey="department"  href="#department">部门</ListGroupItem>
								      <ListGroupItem eventKey="mobile"  href="#mobile">手机</ListGroupItem>
								      <ListGroupItem eventKey="tel"  href="#tel">座机</ListGroupItem>
								    </ListGroup>
							    </form>
					      </Panel>
			          </Col>
			          <Col xs={12} md={8}>
					      <Panel header="复制一下到邮箱配置">

						        <Signature 
						        	className={this.state.signatureData.className}
						        	realName={this.state.signatureData.realName}
						        	mobile={this.state.signatureData.mobile}
						        	tel={this.state.signatureData.tel}
						        	email={this.state.signatureData.email}
						        	department={this.state.signatureData.department}
				
						        />

					      </Panel>
			          </Col>
			        </Row>
			    </Grid>

			);
		}
	});

	React.render(
		<PageLayout />,
		document.getElementById('wrap')
	);


	return PageLayout;

});

