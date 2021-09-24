function isInsideCanvas (obj,CANVAS_WIDTH,CANVAS_HEIGHT) 
{   
    let x = obj.x;
    let y = obj.y;
    let xValue = x > 0 || x < CANVAS_WIDTH;
    let yValue = y > 0 || y < CANVAS_HEIGHT;

    if (xValue && yValue)
    {
        return true;
    }
    return false;
}