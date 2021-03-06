// {
//     [
//     {
//         "nodeId": 1,
//         "nodes": [
//         {
//             "nodeId": 2,
//             "nodes": [
//             {
//                 "nodeId": 3,
//             },
//             {
//                 "nodeId": 4,
//             }],
//         },
//         {
//             "nodeId": 5,
//         }]
//     },
//     {
//         "nodeId": 6,
//     }
//     ]
// }
'use strict'
var arr = [{"nodeId":1,"nodes":[{"nodeId":2,"nodes":[{"nodeId":3,"parentNode":2,"state":{"selected":true,"expanded":false},"text":"Grandchild 1"},{"nodeId":4,"parentNode":2,"state":{"selected":false,"expanded":false},"text":"Grandchild 2"}],"parentNode":1,"state":{"selected":false,"expanded":false},"text":"Child 1"},{"nodeId":5,"parentNode":1,"state":{"selected":false,"expanded":false},"text":"Child 2"}],"parentNode":0,"state":{"selected":false,"expanded":false},"text":"Paresdfsdnt 1"},{"nodeId":6,"parentNode":0,"state":{"selected":false,"expanded":false},"text":"Parent 2"}]

        //寻找父元素
        function t( tree, nid){
            var arr = []
            for(var i=0; i<tree.length; i++){
                if(tree[i].nodes){
                    for(var j=0; j<tree[i].nodes.length; j++){
                        if(tree[i].nodes[j].nodeId == nid){
                            return tree[i].nodeId
                        }
                        arr.push(tree[i].nodes[j])
                    }
                }
            }
            if(arr.length>0){
                return t( arr,nid )
            }
            // return arr
            return 0
        }

var t = t(arr,11)
console.log(t)




//寻找本元素
// function t( tree, nid){
//     var arr = []
//     for(var i=0; i<tree.length; i++){
//         if(tree[i].nodeId == nid){
//             return tree[i].nodeId
//         }
//         if(tree[i].nodes){
//             for(var j=0; j<tree[i].nodes.length; j++){
//                 arr.push(tree[i].nodes[j])
//             }
//         }
//     }
//     if(arr.length>0){
//         return t( arr,nid )
//     }
//     // return arr
//     return false
// }



var arr = [{
    "nodeId": 1,
    "nodes": [{
        "nodeId": 2,
        "nodes": [{
            "nodeId": 3,
            "parentNode": 2,
            "state": {
                "selected": true,
                "expanded": false
            },
            "text": "Grandchild 1"
        },
        {
            "nodeId": 4,
            "parentNode": 2,
            "state": {
                "selected": false,
                "expanded": false
            },
            "text": "Grandchild 2"
        }],
        "parentNode": 1,
        "state": {
            "selected": false,
            "expanded": false
        },
        "text": "Child 1"
    },
    {
        "nodeId": 5,
        "parentNode": 1,
        "state": {
            "selected": false,
            "expanded": false
        },
        "text": "Child 2"
    }],
    "parentNode": 0,
    "state": {
        "selected": false,
        "expanded": false
    },
    "text": "Paresdfsdnt 1"
},
{
    "nodeId": 6,
    "parentNode": 0,
    "state": {
        "selected": false,
        "expanded": false
    },
    "text": "Parent 2"
}]







'use-strict';
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { toggleTodo,willDownItem } from '../actions'
var KEY_CODES = {
  ENTER: 13,
  BACKSPACE: 8
};

var DefaultTagComponent = React.createClass({
  render: function () {
    var self = this, p = self.props;
    // var className = 'tag' + (p.classes ? (' ' + p.classes) : '');
    // console.log(className )
    // var className = 'bootstrap-tagsinput' + (p.classes ? (' ' + p.classes) : '');

    return (
        <span className="tag label label-info" onClick={p.onEdit}>
          {p.item}
          <span data-role="remove" onClick={p.onRemove}></span> {/*删除符号显示区域*/}
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
    delimiters: React.PropTypes.arrayOf(function (props, propName, componentName) {
      if (typeof props[propName] !== 'string' || props[propName].length !== 1) {
        return new Error('TaggedInput prop delimiters must be an array of 1 character strings')
      }
    }),
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
      //按要求，tags是一个对象数组，数组元素必须是对象，而不是单单一个文本
      tags: (this.props.tags || []).slice(0),
      
      currentInput: null
    };
  },
  //提交渲染
  render: function () {
    var self = this, s = self.state, p = self.props;
    //p是调用是，外部出入的数据
    var tagComponents = [],
      // classes = "tagged-input-wrapper",
      classes = "tagsinput-primary",  //自定义的
      placeholder,
      i;

    if (p.classes) {
      classes += ' ' + p.classes;
    }
    //s.tags 应该是一个对象，对象当中可以放文本，等其他一些东西
    if (s.tags.length === 0) {
      placeholder = p.placeholder;
    }

    var TagComponent = DefaultTagComponent;

    for (i = 0; i < s.tags.length; i++) {
      //添加新的tag
      tagComponents.push(
        <TagComponent
          key={'tag' + i}
          item={s.tags[i]}
          itemIndex={i}
          onRemove={self._handleRemoveTag.bind(this, i)}
          onEdit={p.clickTagToEdit ? self._handleEditTag.bind(this, i) : null}
          classes={p.unique && (i === s.duplicateIndex) ? 'duplicate' : ''}
          removeTagLabel={p.removeTagLabel || "\u274C"} //添加删除文件记号
         
        />
      );
    }

    //输入区域设置
    //     <input type="text" placeholder="" style="width: 3em !important;" />  //输入区域
    var input = (
      <input type="text"
        className="tagged-input"
        ref="input"
        onKeyUp={this._handleKeyUp}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        onBlur={this._handleBlur}
        defaultValue={s.currentInput}  //当前的输入值
        placeholder={placeholder}
        tabIndex={p.tabIndex}>
        
      </input>
      );

    return (

      // <div className={classes} onClick={self._handleClickOnWrapper}>
      <div className='tagsinput-primary' onClick={self._handleClickOnWrapper}>
        <div className='bootstrap-tagsinput'>
          {tagComponents}
          {input}
        </div>
      </div>
      );
  },
    //组件更新，组件有变化
    componentDidMount: function () {
        //在此方法中设置setState将引起重新渲染 re-render

        // if (p.autofocus) {
        //   self.refs.input; //获取input的输入数据
        //   console.log( self.refs.input )
        // }
    },
    //组件更新，组件从prop收到数据
    componentWillReceiveProps: function (nextProps) {
        //从其他组件发送action，引起本组件的内容变化
        var self = this, s = self.state, p = self.props;
        var txt = nextProps.currentInput //这里其实是对象数组
        // txt = txt.trim();
        // s.tags.push(txt); 
        //整个tags一起推送过来的
        s.tags = txt //这样写就重新更新了tags
        //当前输入的功能将会被删除的掉，因为现在暂时用不到，数据直接送treeview那边组件传送过来的
        // self.setState({currentInput: txt}, function () {
        //     p.onAddTag && p.onAddTag(txt);
        //     // callback && callback(true);
        // });

        // this.setState({
        //   // this.props.tags: (nextProps.tags || []).slice(0)
        // })
    },
  //处理移除标记
  _handleRemoveTag: function (index) {
    var self = this, s = self.state, p = self.props;

    if (p.onBeforeRemoveTag(index)) {
      var removedItems = s.tags.splice(index, 1);
    //   p.onWillDownItem( s.tags )
      if (s.duplicateIndex) {
        self.setState({duplicateIndex: null}, function () {
          // p.onRemoveTag && p.onRemoveTag(removedItems[0], s.tags); //用于显示输出这样的操作
        p.onRemoveTag && p.onRemoveTag( s.tags);
        });
      } else {
        // p.onRemoveTag && p.onRemoveTag(removedItems[0], s.tags);
        p.onRemoveTag && p.onRemoveTag( s.tags);
        self.forceUpdate();
      }
    }
  },
  //处理编辑的标记
  _handleEditTag: function (index) {
    var self = this, s = self.state, p = self.props;
    var removedItems;
//整个函数要停止使用
    if (s.currentInput) {
      var trimmedInput = s.currentInput.trim();
      if (trimmedInput && (this.state.tags.indexOf(trimmedInput) < 0 || !p.unique)) {
        this._validateAndTag(s.currentInput);
      }
    }

    removedItems = s.tags.splice(index, 1);
    if (s.duplicateIndex) {
      self.setState({duplicateIndex: null, currentInput: removedItems[0]}, function () {
        p.onRemoveTag && p.onRemoveTag(removedItems[0]);
      });
    } else {
      self.setState({currentInput: removedItems[0]}, function () {
        p.onRemoveTag && p.onRemoveTag(removedItems[0]);
      });
    }
  },
  //处理快捷键抬起
  _handleKeyUp: function (e) {
    var self = this, s = self.state, p = self.props;

    var enteredValue = e.target.value;

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        if (s.currentInput) {
          self._validateAndTag(s.currentInput, function (status) {
            if (p.onEnter) {
              p.onEnter(e, s.tags);
            }
          });
        }
        break;
    }
  },
  //处理快捷键按下
  _handleKeyDown: function (e) {
    var self = this, s = self.state, p = self.props;
    var poppedValue, newCurrentInput;

    switch (e.keyCode) {
      case KEY_CODES.BACKSPACE:
        if (!e.target.value || e.target.value.length < 0) {
          if (p.onBeforeRemoveTag(s.tags.length - 1)) {
            poppedValue = s.tags.pop();

            newCurrentInput = p.backspaceDeletesWord ? '' : poppedValue;

            this.setState({
              currentInput: newCurrentInput,
              duplicateIndex: null
            });
            if (p.onRemoveTag && poppedValue) {
              p.onRemoveTag(poppedValue);
            }
          }
        }
        break;
    }
  },
  //处理变化
  _handleChange: function (e) {
    var self = this, s = self.state, p = self.props;

    var value = e.target.value,
      lastChar = value.charAt(value.length - 1),
      tagText = value.substring(0, value.length - 1);

    if (p.delimiters.indexOf(lastChar) !== -1) {
      self._validateAndTag(tagText);
    } else {
      this.setState({
        currentInput: e.target.value
      });
    }
  },
  //处理淡化
  _handleBlur: function (e) {
    if (this.props.tagOnBlur) {
      var value = e.target.value;
      value && this._validateAndTag(value);
    }
  },
  //处理在包裹层点击
  _handleClickOnWrapper: function (e) {
    this.refs.input;
  },
  //验证和标记 
  _validateAndTag: function (tagText, callback) {
    var self = this, s = self.state, p = self.props;
    var duplicateIndex;
    var trimmedText;
    
    if (tagText && tagText.length > 0) {
      trimmedText = tagText.trim();
      if (p.unique) { //p.unique 是用来做，是否判断输入值的唯一性 这个检查
//这里要更改
        // not a boolean, it's a function
        if (typeof p.unique === 'function') {
          duplicateIndex = p.unique(this.state.tags, trimmedText);
        } else {
          duplicateIndex = this.state.tags.indexOf(trimmedText);
        }

        if (duplicateIndex === -1) {
          if (!p.onBeforeAddTag(trimmedText)) {
            return;
          }
          var obj = {text:trimmedText,code:trimmedText}
          s.tags.push(obj);
          self.setState({
            currentInput: '',
            duplicateIndex: null
          }, function () {
            p.onAddTag && p.onAddTag(tagText, s.tags);
            // p.onWillDownItem( s.tags )  //本组件目前只负责，删除功能，将删除掉的节点信息发送到store，到时候，可以增加查询，增加功能，不过需要时间，目前不是最为紧急的
            callback && callback(true);
          });
        } else {
          self.setState({duplicateIndex: duplicateIndex}, function () {
            callback && callback(false);
          });
        }
      } else {
        if (!p.onBeforeAddTag(trimmedText)) {
          return;
        }

        s.tags.push(trimmedText);
        self.setState({currentInput: ''}, function () {
          p.onAddTag && p.onAddTag(tagText);
          callback && callback(true);
        });
      }
    }
  },
  //获取标记
  getTags: function () {
    return this.state.tags;
  },
  //获取输入的字符
  getEnteredText: function () {
    return this.state.currentInput;
  },
  //获取所有数值
  getAllValues: function () {
    var self = this, s = this.state, p = this.props;

    if (s.currentInput && s.currentInput.length > 0) {
      return this.state.tags.concat(s.currentInput);
    } else {
      return this.state.tags;
    }
  }

});



/**
 * state是组件内的，维护组件内部状态的一个东西
 * props是组件外部穿件组件内部的东西
 * 组件内部发生的变化，引起组件自己发生变化，就是通过state来运作的
 * 外部通过，props传入函数定义一个dispath来获取变化的state，并发送出来如果你想要的
 * 这样我应该理解的多一点了
 */


