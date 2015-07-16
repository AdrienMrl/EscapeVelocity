#pragma strict

function readHighScore() {
    var score = PlayerPrefs.GetInt("highScore");
    GetComponent.<UnityEngine.UI.Text>().text = "Top: " + score;
}

function saveHighScore(score: int) {

    if (PlayerPrefs.GetInt("highScore") < score) {
        PlayerPrefs.SetInt("highScore", score);
        GetComponent.<UnityEngine.UI.Text>().text =
            "New high score ! Awesome !";
    }
}

function Start () {
    readHighScore();
}
