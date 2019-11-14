<template>
    <div class="className">
        <el-card class="anoCard">
            <div slot="header">
                <span>会员详情</span>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick" class="anoTab">
                <el-tab-pane label="基本信息" name="first" class="anoPane">
                    <div>头像：<img src="../../assets/personal/user01.jpg" /></div>
                    <div>姓名：<span>1</span></div>
                    <div>手机号：<span>1</span></div>
                    <div>注册日期：<span>1</span></div>
                    <div>推荐人：<span>1</span></div>
                    <div>团队数：<span>1</span></div>
                    <div>群聊数量：<span>1</span></div>
                    <div>状态：<span>1</span></div>
                    <div>最后一次活跃时间：<span>1</span></div>
                </el-tab-pane>
                <el-tab-pane label="聊天记录" name="second" class="anoPaneSecond">
                    <div class="chatRecord_left">
                        <div class="search">
                            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                                <el-select v-model="select" slot="prepend" placeholder="请选择">
                                    <el-option label="姓名" value="1"></el-option>
                                    <el-option label="手机号" value="2"></el-option>
                                </el-select>
                                <el-button slot="append" type="primary">搜索</el-button>
                            </el-input>
                            <div class="list">
                                <div v-for="(item, index) in 8" :key="index">
                                    <img src="../../assets/personal/user01.jpg" />
                                    <div class="list_name">
                                        <span>腾云飞</span>
                                        <div>团队</div>
                                        <span>早上9:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chatRecord_right">
                        <div style="height: 50px;"></div>
                        <div class="msg">
                            <span><img src="../../assets/personal/user01.jpg" /></span>
                            <span>2019 1-1 12:12:12</span>
                        </div>
                        <div class="msg" v-for="(item, index) in 10" :key="index">
                            <span>开启评论不要脸模式，这个APP太棒了。开启评论不要脸模式，这个APP太棒了。开启评论不要脸模式，这个APP太棒了。</span>
                            <span>2019 1-1 12:12:12</span>
                        </div>
                        <el-pagination
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :current-page.sync="currentPage3"
                                :page-sizes="pageSizes"
                                :page-size="pageSize"
                                :current-page="currentPage"
                                :total="total"
                                @size-change="handleSize"
                                @current-change="handlePage"
                        >
                        </el-pagination>
                    </div>
                    <div class="see_btn">
                        <div style="margin-top: 50px">查看所有人</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="朋友圈" name="third" class="third">
                    <div class="friends_circle">
                        <el-input v-model="inputPyQ" placeholder="请输入内容" style="width: 80%;"></el-input>
                        <el-button type="primary">搜索</el-button>
                    </div>
                    <div class="friends_list">
                        <div class="item_msg" v-for="(item, index) in 10" :key="index">
                            <p>2018 1-1 00:00:00</p>
                            <p>AntSay是一款轻量级的评论插件，简单三步即可以在自己的网站中嵌入。</p>
                            <p>1. 获取App ID</p>
                            <p>1. 获取App ID</p>
                            <p>1. 获取App ID</p>
                            <p>赶紧使用吧，地址https://www.baidu.com/</p>
                            <div class="icon_num">
                                <div><i class="el-icon-chat-dot-round"></i>  6</div>
                                <div><i class="el-icon-chat-dot-round"></i>  10</div>
                            </div>
                        </div>

                        <el-pagination
                                background
                                layout="total, sizes, prev, pager, next, jumper"
                                :current-page.sync="currentPage3"
                                :page-sizes="pageSizes"
                                :page-size="pageSize"
                                :current-page="currentPage"
                                :total="total"
                                @size-change="handleSize"
                                @current-change="handlePage"
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'Detail',
        data() {
            return {
                activeName: 'first',
                input: '', //按姓名搜索
                select: '',
                inputPyQ: '', //朋友圈搜索
                currentPage: 1, //分页参数
                pageSize: 5,
                total: 100,
                pageSizes: [5, 10, 20, 40],
                currentPage3: 5,
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSize(val) {
                this.pageSize = val;
                this.getPageData()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getPageData()
            }
        }
    }
</script>
<style lang="scss" scoped>
.anoCard .el-table .el-button {
    padding: 8px 18px;
    font-size: 12px;
}
.anoCard {
    .el-card__body:after {
        content: '';
        clear: both;
        width: 0;
        height: 0;
        visibility: hidden;
        display: block;
    }
}
.anoTab {
    font-size: 16px;
    .anoPane img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-left: 50px;
    }
    .anoPane>div {
        /*height: 100px;*/
        margin-top: 20px;
        display: flex;
        align-items: center;
    }
    .anoPane>div span {
        margin-left: 30px;
    }
    .anoPaneSecond {
        display: flex;
    }
    .chatRecord_left {
        width: 20%;
        .list {
            margin-top: 10px;
        }
        .list>div {
            display: flex;
            align-items: center;
            border: 1px solid;
            margin: 5px 0;
        }
        .list img {
            width: 80px;
            height: 80px;
        }
        .list .list_name {
            display: flex;
            width: 80%;
            justify-content: space-around;
            div {
                width: 50px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                background: greenyellow;
                border-radius: 20px;
                color: #409eff;
                font-size: 14px;
            }
        }
    }
    .chatRecord_right {
        width: 60%;
        margin-left: 30px;
        .msg {
            display: flex;
            justify-content: space-between;
            min-height: 50px;
            max-height: 130px;
            line-height: 50px;
            span:nth-child(1) {
                width: 80%;
            }
            img {
                width: 200px;
                height: 120px;
            }
        }
    }
    .see_btn {
        margin-left: 100px;
        color: #409eff;
        font-size: 18px;
        :hover {
            cursor: pointer;
        }
    }

    .friends_circle {
        width: 25%;
        display: flex;
        justify-content: space-between;
    }
    .friends_list {
        width: 45%;
        .item_msg {
            margin: 20px 0;
            border: 1px solid #eee;
            p {
                margin: 5px 0;
            }
        }
        .icon_num {
            display: flex;
            div {
                margin-right: 30px;
            }
        }

    }
}
</style>
