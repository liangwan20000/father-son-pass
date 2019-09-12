/**
*	表单组件双向绑定操作
*/
/**
*	引入React核心组件
*/
import React from 'react';
// 创建类组件
class Form extends React.Component {
	// 构造函数,并传参
	constructor (props) {
		// 构造函数中第一行代码必须是super
		super(props);
		// this前必须定义super
		this.state = {
			uname: ''
		};
		// 改变函数的this
		this.handleUname = this.handleUname.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleUname = function (event) {
		// 改变状态必须用setState
		this.setState({
			uname: event.target.value
		})
		console.log(event.target.value);
	}
	handleSubmit = function (event) {
		// 改变状态必须使用setState
		this.setState({
			uname: this.state.uname + 1
		})
	}
	// 类组件模板必须通过render方法提供
	// render方法是固定的，提供要渲染的模板
	render () {
		// 返回jsx元素
		return (
			<div>
				{/*当只绑定value时，输入框不能输入；需要在onChange绑定的事件中，设置状态等于输入框的值*/}
				<input type="text" value={ this.state.uname } onChange={ this.handleUname }/>
				<button onClick={ this.handleSubmit }>点击</button>
			</div>
		)
	}
}
/**
*	导出类组件
*/
export default Form;
