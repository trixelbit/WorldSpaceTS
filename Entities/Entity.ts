import {View} from "../Views/View";
import {Vector3} from "../Math/Vector3";

export interface IComponent
{
    Start(): void;

    Update(): void;
    
    SetEntity(entity: Entity): void;
}

export abstract class Component implements IComponent
{
  protected _entity : Entity;

  public get Entity() : Entity
  {
    return this._entity;
  }

  public abstract Start(): void;

  public abstract Update(): void;

  public SetEntity(entity: Entity): void 
  {
    this._entity = entity;
  }
}

export class Entity
{
  public WorldPosition: Vector3;
  
  public Scale : number = 1;

  /**
   * @summary {boolean} IsFixed If true, the entity will not move when the camera moves.
   */
  public IsFixed : boolean = false;

  /**
   * @summary {boolean} OverrideScale If true, the entity will not scale with respect to the z position.
   */
  public OverrideScale : boolean = false;
  
  public readonly Element: HTMLElement;

  private static s_number : number = 0;

  private _id: string = Entity.GenerateID().toString(); 

  private _components: IComponent[];

  /**
   * @param elementType {string} Type of element to create.
   * @param name {string} Name of Entity
   * @param position {Vector2} starting position in world space for entity.
   * @param parent
   **/
  constructor(elementType: string, name: string, position: Vector3 = Vector3.Zero(), parent: HTMLElement | undefined = undefined)
  {
    this.WorldPosition = position;
    
    this.Element = this.BuildElement(elementType)
    this.Element.style.position = "absolute";
    this.Element.id = name + " - " + this._id;
    this.Element.style.zIndex = position.z.toString();
   
    if(parent === undefined)
    {
      document.body.appendChild(this.Element);
    }
    else
    {
        parent.appendChild(this.Element);
    }
    
    this._components = [];
    
    View.Instance.AddEntity(this);
  }

  /**
   * 
   * @param elementType
   */
  public BuildElement(elementType: string) : HTMLElement
  {
    return document.createElement(elementType);
  }
  
  private static GenerateID() : number
  {
    Entity.s_number = Entity.s_number + 1;
    return Entity.s_number;
  }

  public AddComponent(component: IComponent): void
  {
    component.SetEntity(this);
    this._components.push(component);
  }

  public Start(): void
  {
    for(const component of this._components)
    {
        component.Start();
    }
  }

  public Update(): void
  {
    for(const component of this._components)
    {
      component.Update();
    }
  }

  public SetSprite(sprite_address: string)
  {
    if(this.Element as HTMLImageElement === null)
    {
      return;
    }
    
    if(this.Element.getAttribute("src") === sprite_address)
    {
      return;
    }

    this.Element.setAttribute("src", sprite_address);
  }

  public ApplyCameraPositionToElement(cameraPosition: Vector3): void
  {
    let screenPosition: Vector3 = this.WorldPosition;

    if(!this.IsFixed)
    {
      screenPosition = Vector3.Subtract(this.WorldPosition, cameraPosition);
    }
    
    this.Element.style.transform = `perspective(100px) translate3d(${screenPosition.x}px, ${screenPosition.y}px, ${screenPosition.z}px) scale(${this.Scale})`;
  }
}





