/**
*	表格案例
*/
/**
*	引入React核心文件
*/
import React from 'react';
/**
*	引入样式文件
*/
import '../static/formcase.css';
/**
*	定义组件
*/
class FormCase extends React.Component {
	// 调用父类构造函数，并把值传递过去
	constructor (props) {
		// 构造函数中第一行代码必须是super
		super(props);
		// this前必须加super
		// state是组件的私有状态，并且是响应式的；函数组件的私有状态不是响应式的，所以说函数组件没有私有状态
		this.state = {
			// 输入框ID
			bookId: '',
			// 输入框名称
			bookName: '',
			// 保存数据
			bookList: [],
			// 状态位
			flag: true
		};
		// 改变方法this指向
		this.numberBook = this.numberBook.bind(this);
		this.nameBook = this.nameBook.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletebook = this.deletebook.bind(this);
		this.modifybook = this.modifybook.bind(this);
	}

	// 组件完成挂载之后
	componentDidMount () {
		let dataList = [{
			id: 1,
			bname: '红楼梦'
		}, {
			id: 2,
			bname: '三国演义'
		}, {
			id: 3,
			bname: '水浒传'
		}, {
			id: 4,
			bname: '西游记'
		}];
		setTimeout(() => {
			// 更改状态必须调用setState
			this.setState({
				bookList: dataList
			})
		}, 1000);
	}
	
	// 实时更新图书编号
	numberBook = function (event) {
		// 改变状态必须使用setState
		this.setState({
			bookId: event.target.value
		})
	}

	// 实时更新图书名称
	nameBook = function (event) {
		// 改变状态必须调用setState
		this.setState({
			bookName: event.target.value
		})
	}

	// 点击时添加图书到列表
	handleSubmit = function (event) {
		// 输入框非空验证
		if (!this.state.bookId) { return alert('请填写图书编号') };
		if (!this.state.bookName) { return alert('请填写图书名称') };
		// 排重验证
		// 最新ID与数据列表ID进行比较，如果有相等则不添加
		let IDindex = this.state.bookList.findIndex(item => {
			return item.id === this.state.bookId
		});
		// 判断
		if (IDindex !== -1) {
			return alert('编号重复');
		};
		// 最新name与数据列表name进行比较，如果有相等则不添加
		let Nameindex = this.state.bookList.findIndex(item => {
			return item.bname === this.state.bookName
		});
		// 判断
		if (Nameindex !== -1) {
			return alert('名称重复');
		}
		// 验证ID必须为数字
		let Num = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
		let reg = new RegExp(Num);
		let id = Number(this.state.bookId);
		if (!reg.test(id)) {
			return alert('请填写数字型编号');
		}
		// 因为改变状态必须使用setState，所以不能直接push,需要先复制一份原有数据进行操作，然后再覆盖原有数据
		// 1. 复制一份数据列表
		let listBook = [...this.state.bookList];
		// 根据输入框数据生成新的对象
		let book = {
			id: this.state.bookId,
			bname: this.state.bookName
		};
		// 把新对象放入数据列表
		listBook.push(book);
		// 调用setState改变状态值
		this.setState({
			bookList: listBook,
			bookId: '',
			bookName: ''
		})
	}
	
	// 点击删除图书
	deletebook = function (id, event) {
		// 阻止默认行为
		event.preventDefault();
		// 复制一份数据列表
		let list = [...this.state.bookList];
		// 查找与ID相同的索引
		let index = list.findIndex(item => {
			return item.id === id;
		});
		// 从数组中删除该项
		list.splice(index, 1);
		// 使用setState重新赋值
		this.setState({
			bookList: list
		}, () => {
			console.log(this.state.bookList);
		});
	}
	
	// 点击编辑图书
	changebook = function (id, event) {
		// 阻止默认行为
		event.preventDefault();
		// 复制一份数据列表
		let list = [...this.state.bookList];
		// 根据ID找到数据
		let arr = this.state.bookList.find(item => {
			return item.id === id
		});
		// 点击编辑用图书信息填充输入框
		this.setState({
			bookId: arr.id,
			bookName: arr.bname,
			flag: false
		})
	}

	// 点击修改图书
	modifybook = function (event) {
		// 最新name与数据列表name进行比较，如果有相等则不添加
		let Nameindex = this.state.bookList.findIndex(item => {
			return item.bname === this.state.bookName
		});
		// 判断
		if (Nameindex !== -1) {
			return alert('名称重复');
		}
		// 复制一份数据列表
		let list = [...this.state.bookList];
		// 根据ID找到数据索引
		list.forEach(item => {
			// 找到替换的数据替换
			if(item.id === this.state.bookId) {
				item.bname = this.state.bookName;
			};
		});
		// 重新赋值
		this.setState({
			bookList: list,
			flag: true,
			bookId: '',
			bookName: ''
		})
	}

	// 类组件的模板通过render方法提供
	// render方法是固定写法，提供要渲染的模板
	render () {
		// 根据数据动态生成表格
		let trlist = this.state.bookList.map((item) => {
			return (
				<tr key={ item.id }>
					<td>{ item.id }</td>
					<td>{ item.bname }</td>
					<td>
						<a href="http://www.baidu.com" onClick={ this.changebook.bind(this, item.id) }>编辑</a>
						<a href="http://www.baidu.com" onClick={ this.deletebook.bind(this, item.id) }>删除</a>
					</td>
				</tr>
			)
		})
		// 返回jsx元素
		return (
			<div>
				<table>
					<caption>图书管理系统</caption>
					<caption id="caption">
						<label>编号：</label>
						<input
							readOnly={ !this.state.flag }
							type="text"
							value={ this.state.bookId }
							onChange={ this.numberBook }
							id="number"/>
						<label>名称：</label>
						<input
							type="text"
							value={ this.state.bookName }
							onChange={ this.nameBook }
							id="name"/>
						<button onClick={ this.state.flag === false ? this.modifybook : this.handleSubmit }>提交</button>
					</caption>
					<thead>
						<tr>
							<th>编号</th>
							<th>名称</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{ this.state.bookList.length === 0 && <tr><td colSpan="3">正在加载中...</td></tr> }
						{ trlist }
					</tbody>
				</table>
			</div>
		)
	}
}
/**
*	导出类组件
*/
export default FormCase;
