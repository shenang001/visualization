import request from '@/utils/request.js'
export const getVisualization = ()=>{
    // 导出基本接口
    return request({
        url:'/visualization',

    })
}