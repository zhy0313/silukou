'use-strict';
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { toggleTodo,willDownItem } from '../actions'

var DefaultTagComponent = React.createClass({
  render: function () {
    var self = this, p = self.props;
    return (
        <span className="tag label label-info" onClick={p.onEdit}>
          {p.item}
         {/* <span data-role="remove" onClick={p.onRemove}></span> 删除符号显示区域*/}
        </span> 
    );
  }

});

// var txt = React.createClass({
module.exports = React.createClass({
  displayName: 'TaggedInput',
  //类型检查
  propTypes: {
    onBeforeAddTag: React.PropTypes.func,
    onAddTag: React.PropTypes.func, //增加标记
    onBeforeRemoveTag: React.PropTypes.func,
    onRemoveTag: React.PropTypes.func,
    onEnter: React.PropTypes.func,
    unique: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.func]),
    autofocus: React.PropTypes.bool,
    backspaceDeletesWord: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    tags: React.PropTypes.arrayOf(React.PropTypes.any),
    removeTagLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    // delimiters: React.PropTypes.arrayOf(function (props, propName, componentName) {
    //   if (typeof props[propName] !== 'string' || props[propName].length !== 1) {
    //     return new Error('TaggedInput prop delimiters must be an array of 1 character strings')
    //   }
    // }),
    tagOnBlur: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    clickTagToEdit: React.PropTypes.bool
  },
  //获取默认的props
  getDefaultProps: function () {
    return {
      delimiters: [' ', ','],
      unique: true,
      autofocus: false,
      backspaceDeletesWord: true,
      tagOnBlur: false,
      clickTagToEdit: false,
      onBeforeAddTag: function (tag) {
        return true;
      },
      onBeforeRemoveTag: function (index) {
        return true;
      },
    };
  },
  //初始化状态state
  getInitialState: function () {
    return {
      tags: (this.props.tags || []).slice(0),
      currentInput: null
    };
  },
  //提交渲染
  render: function () {
    var self = this, s = self.state, p = self.props;
    //p是调用是，外部出入的数据
    var tagComponents = [],
      classes = "tagsinput-primary",  //自定义的
      placeholder,
      i;

    if (p.classes) {
      classes += ' ' + p.classes;
    }
    var len = s.tags.length
    if (len === 0) {
      placeholder = p.placeholder;
    }

    var TagComponent = DefaultTagComponent;

    for (i = 0; i < len; i++) {
      
      //添加新的tag
      tagComponents.push(
        <TagComponent
          item={s.tags[i][1]}
          itemIndex={i}
          onRemove={self._handleRemoveTag.bind(this, i)}
          removeTagLabel={p.removeTagLabel || "\u274C"} //添加删除文件记号
         
        />
      );
    }

    return (
      // <div className={classes} onClick={self._handleClickOnWrapper}  style="height: 45px;">
      <div className='tagsinput-primary' onClick={self._handleClickOnWrapper}>
        <div className='bootstrap-tagsinput' >
          {tagComponents}
        </div>
      </div>
      );
  },


    //组件更新，组件从prop收到数据
    componentWillReceiveProps: function (nextProps) {
        //从其他组件发送action，引起本组件的内容变化
        var self = this, s = self.state, p = self.props;
        var txt = nextProps.currentInput
        // alert( JSON.stringify(nextProps) )
        //传进来两次，为什么呢？发现这样一个现象，就是有几个taginput就会有几次alert
        if(txt){
            self.setState({tags: txt} )
        }
        
        
        // self.setState({currentInput: txt}, function () {
        //     p.onAddTag && p.onAddTag(txt);
        //     // callback && callback(true);
        // });
    },
    //本身模块自身的变化
    componentDidUpdate(prevProps, prevState){
    },

    //处理移除标记
    _handleRemoveTag: function (index) {
        var self = this, s = self.state, p = self.props;
        if (p.onBeforeRemoveTag(index)) {
            var removedItems = s.tags.splice(index, 1);
            // p.onWillDownItem( s.tags )  //从这里发送action，传送最新的tags，一般是treeView处理
            // p.onRemoveTag( s.tags)
            //组件自我更新
            self.forceUpdate();
        }
    }
 

});
