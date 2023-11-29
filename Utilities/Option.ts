
export class Option<T>
{
    private _value: T | null;
   
    private _isSome: boolean;
    
    private constructor(value: T | null, isSome: boolean) 
    {
        this._value = value;
        this._isSome = isSome;
    }

    public static Some<T>(value: T) : Option<T>
    {
        return new Option<T>(value, true);
    }

    public static None<T>() : Option<T>
    {
        return new Option<T>(null, false);
    }
  
    public IsSome() : boolean
    {
        return this._isSome;
    }
    
    public Unwrap() : T
    {
        if(!this._isSome)
        {
            throw new Error("Cannot unwrap a None Option.");
        }
        
        return this._value as T;
    }
    
}