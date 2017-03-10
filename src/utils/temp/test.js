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