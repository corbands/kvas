class SortElement
{
  float x;
  float y;
  float r;
  
  int value;
  
//  private MoveManager mm;
  
  SortElement(float x, float y, float r, int value)
  {
	this.x = x;
	this.y = y;
	this.r = r;
	this.value = value;
//	mm = new MoveManager(this);
  }

/*
  void set_destination(float xd, float yd, int dir)
  {    
    mm.set_destination(this.x, this.y, xd, yd, dir);
  }

  boolean move()  // return true, if moving must continued
  {
    return mm.move();
  }   
*/
}

/*
class MoveManager
{
  private float x0;
  private float y0;
  private float x_dest;
  private float y_dest;
  private int direction;
  private int state;
  private SortElement elem;
  
  MoveManager(SortElement e)
  {
    elem = e;
  }

  void set_destination(float x_old, float y_old, float xd, float yd, int dir)
  {    
    x0 = x_old;
    y0 = y_old;
    x_dest = xd;
    y_dest = yd;
    direction = dir;    
    state = 0;
  }
  
  boolean move()
  {
    if (direction == 1)
      return move_forward();
    else if (direction == -1)
      return move_backward();
    
    return true;
  }

  private boolean move_forward()
  {
    if (x0 == x_dest)
      return false;
    
    boolean ret = true;
    float r = elem.r;
    switch (state)
    {
     case 0:
       elem.y += r/10.0;
       elem.x += r/15.0;
       if (elem.y >= y0 + r*3/2)
         state = 1;       
       break;
    case 1:
      elem.x += r/10.0;
      if (elem.x > x_dest - r)
        state = 2;
      break;
    case 2:                    
      elem.x += r/15.0;
      elem.y -= r/10.0;
      if (elem.x >= x_dest - r/1000 && elem.y <= y_dest + r/1000)               
         state = 3;
            
      break; 
    case 3:      
      ret = false;
      break;
    }    
    return ret;
  }
  private boolean move_backward()
  {
    if (x0 == x_dest)
      return false;
    
    boolean ret = true;
    float r = elem.r;
    switch (state)
    {
     case 0:
       elem.y -= r/10.0;
       elem.x -= r/15.0;
       if (elem.y <= y0 - r*3/2)
       {
         state = 1;         
       }      
       break;
    case 1:
      elem.x -= r/10.0;      
      if (elem.x < x_dest + r)
        state = 2;
      break;
    case 2:                    
      elem.x -= r/15.0;
      elem.y += r/10.0;
      if (elem.x <= x_dest + r/1000 && elem.y >= y_dest - r/1000)               
         state = 3;
                
      break; 
    case 3:      
      ret = false;
      break;
    }    
    return ret;
  }
}
*/

