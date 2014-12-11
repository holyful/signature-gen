define(function (require, exports, module) {
	var React = require('react');

	var Signature = React.createClass({displayName: 'Signature',
		propTypes: {
		    realName: React.PropTypes.string,
		    department: React.PropTypes.string,
		    tel: React.PropTypes.number,
		    mobile: React.PropTypes.string,
		    email: React.PropTypes.string,
		    hasAvartar: React.PropTypes.bool
  		},
  		
  		getDefaultProps: function() {
	    	

		    return {
		    	className:'signature signature-light'
			};
		},
		getInitialState: function(){

			return {

			}
		},

  		render: function() {

  			var mobileDis = {
  				display: this.props.mobile ? 'block' : 'none'
  			}

  			var telDis = {
  				display: this.props.tel ? 'block' : 'none'
  			}


			return (

				<div className={this.props.className} >
						<p>-------------------------------------------</p>
						<p >{this.props.realName}&nbsp;</p>
						<p>大众点评网(www.dianping.com)&nbsp;{this.props.department}</p>
						<p>上海市长宁区安化路492号C座2楼</p>
						<p style={telDis}>Tel:(+8621)53559777-{this.props.tel}</p>
						<p style={mobileDis}>Mobile:{this.props.mobile}</p>
						<p>Email:{this.props.email}</p>
				</div>

				/*
					佘达轩
					大众点评网(www.dianping.com)交易与基础技术平台
					上海市长宁区安化路492号C座5楼
					Tel:(8621)53559777-1709
					Mobile:18688390210
					Email: daxuan.she@dianping.com
				*/

			);
		}


	});

	module.exports = Signature;

});