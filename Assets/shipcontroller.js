#pragma strict

private var power : float = 4000.0;
private var initial_velocity : float = 12.0;
public var ship_item_prefab : GameObject;

function Start () {
    GetComponent.<Rigidbody2D>().velocity =
        transform.up * initial_velocity;
}

function Update () {

    if (Input.GetKey("space") || Input.touchCount > 0)
        GetComponent.<Rigidbody2D>()
            .AddForce(transform.up * Time.deltaTime * power);

    var dir : Vector2 = transform.GetComponent.<Rigidbody2D>().velocity;
       var   angle : float = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
       angle -= 90;
          transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
}

function OnCollisionEnter2D(collision : Collision2D) {
    if (collision.gameObject.tag == "items")
        return;

    for (var i = 0; i < 100; i++) {
        var prefab : GameObject = Instantiate(ship_item_prefab);
        prefab.transform.position = transform.position;
        prefab.GetComponent.<Rigidbody2D>().velocity =
            GetComponent.<Rigidbody2D>().velocity * 1.5;
        prefab.tag = "items";
    }
    gameObject.active = false;
}
