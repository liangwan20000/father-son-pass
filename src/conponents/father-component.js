/**
*	父子传值--父组件
*/
/**
*	引入React核心组件
*/
import React from 'react';
/**
*	引入子组件
*/
import Son from './son-component.js';
/**
*	基于类创建组件
*/
class Father extends React.Component {
	// 构造函数
	constructor (props) {
		// 向基础类传递值
		super(props);
		// 构造函数中this前必须添加super
		// state中定义组件的私有状态，是响应式的，函数组件的私有状态不是响应式的，所以说函数组件中没有私有状态
		this.state = {
			total: 2
		};
		// 给方法添加this
		this.summation = this.summation.bind(this);
	}
	// 传递值
	summation = function (num) {
		// 把传递过来的值保存并累加
		this.setState({
			total: this.state.total + num
		})
	}
	// 类组件模板必须通过render方法提供
	// render方法是固定写法，提供渲染的模板
	render () {
		// 返回一个jsx元素
		return (
			<div>
				<div>{ this.state.total }</div>
				<Son summation={ this.summation }></Son>
				<Son summation={ this.summation }></Son>
			</div>
		)
	}
};
/**
*	导出类组件
*/
export default Father;
