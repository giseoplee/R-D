

app.factory("voteService",function($q,socketio){

    return{
        getMsg:function(){
            return $q.when();
        },
        joinMsg:function(data){
            socketio.emit("join room",data);
        },
        voteMsg:function(data){
            socketio.emit("vote",data);
        }
    }
})