#pragma strict

private var power : float = 700.0;
private var initial_velocity : float = 5.0;
public var ship_item_prefab : GameObject;
public var score : int = 1;
public var text_score : UnityEngine.UI.Text;
public var isAlive : boolean = true;
public var Highscore : highscore;
public var PlayAgain : GameObject;
private var close_planet : GameObject;

function Start () {
    GetComponent.<Rigidbody2D>().velocity =
        transform.up * initial_velocity;
    text_score.text = score.ToString();
}

function find_closest_planet() {
    var planets = GameObject.FindGameObjectsWithTag("planet");

    var distance_min = -1;
    var id = -1;
    var planet : GameObject;

    for (var p : GameObject in planets) {
        var distance = Vector3.Distance(p.transform.position,
                transform.position);
        if (distance < distance_min || distance_min < 0) {
            distance_min = distance;
            id = p.GetComponent.<planet>().id;
            planet = p;
        }
    }

    if (close_planet != planet && close_planet != null)
        close_planet.GetComponent.<planet>().done = true;
    close_planet = planet;
    var max = 4;
    if (distance_min > 14 && 
            GetComponent.<Rigidbody2D>().velocity.magnitude > max) {
        power = 20;
        GetComponent.<Rigidbody2D>().velocity *= 0.97;
    } else
        power = 800;

    return id;
}

function Update () {

    var particles = transform.GetChild(0).GetComponent.<ParticleSystem>();
    if (Input.GetKey("space") || Input.touchCount > 0) {
        GetComponent.<Rigidbody2D>()
            .AddForce(transform.up * Time.deltaTime * power);
            particles.enableEmission = true;
    } else if (particles.isPlaying)
        particles.enableEmission = false;

    var dir : Vector2 = transform.GetComponent.<Rigidbody2D>().velocity;
    var angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
    angle -= 90;
    transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);

    var planet_id = find_closest_planet();
    if (planet_id > score) {
        score = planet_id;
        text_score.text = score.ToString();
    }
}

function saveScore() {
    Highscore.saveHighScore(score);
}

function OnCollisionEnter2D(collision : Collision2D) {
    if (collision.gameObject.tag == "items")
        return;

    for (var i = 0; i < 30; i++) {
        var prefab : GameObject = Instantiate(ship_item_prefab);
        prefab.transform.position = transform.position;
        prefab.GetComponent.<Rigidbody2D>().velocity =
            GetComponent.<Rigidbody2D>().velocity * 1.5;
        prefab.tag = "items";
    }
    gameObject.SetActive(false);
    isAlive = false;
    saveScore();
    PlayAgain.SetActive(true);
}
