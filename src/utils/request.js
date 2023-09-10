import axios from "axios";
const service = axios.create({
    baseURL:'https://api.imooc-web.lgdsunday.club/api',
    timeout:5000
})
    // 添加请求拦截器
    service.interceptors.request.use(
        (config)=>{
            config.headers.icode = 'input your icode';
            return config;   //必须返回配置
        },
        (error)=>{
            return Promise.reject(error)
        }
    )
        // 响应拦截器
        service.interceptors.response.use(
            (response)=>{
                const {success,message,data} = response.data;
                if(success){
                    return data
                }else{
                    return Promise.reject(new Error(message))
                }
            }
        )
        export default service;
