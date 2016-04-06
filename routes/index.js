var express = require('express');
var router = express.Router();

var _ = require('underscore');

var team_number = 11;
var problem_list = _.range(team_number);
var team_set = new Set();

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function reset(number) {
    if (number) {
        team_number = number;
    }
    problem_list = _.range(team_number);
    shuffle(problem_list);
    result = [];
    team_set = new Set();
}

shuffle(problem_list);

var result = [];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '题目抽取'});
});

router.get('/setting', function (req, res, next) {
    res.render('setting', {title: '管理', info: ""});
});

router.get('/list', function (req, res, next) {
    res.render('list', {title: '题目抽取结果', teams: result});
});

router.post('/setting', function(req, res, next) {
    var password = req.body.password;
    var number = req.body.number;
    var need_reset = req.body.reset;

    console.log(req.body);

    if (password=='[ASdf12#$]') {
        if (need_reset) {
            reset(number);
        } else {
            if (number) {
                reset(number);
            }
        }
        res.render('setting', {title: '管理', info: `修改成功, ${problem_list.length}个队伍还未抽取`, style: "success"});
    } else {
        res.render('setting', {title: '管理', info: "密码错误", style: "danger"});
    }
});

router.post('/', function (req, res, next) {
    if (problem_list.length > 0) {
        if (team_set.has(req.body.name)) {
            res.json({err: '您的队伍已经抽取过题目'});
        } else {
            var team = {
                name: req.body.name,
                problem: problem_list.pop() + 1
            };
            result.push(team);
            team_set.add(req.body.name);
            res.json(team);
        }
    } else {
        res.json({err: '没有更多题目了'});
    }
});

module.exports = router;
