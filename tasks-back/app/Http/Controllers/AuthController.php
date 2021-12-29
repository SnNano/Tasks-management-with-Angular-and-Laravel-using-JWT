<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['username', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function register(Request $req){
        $validatedData = Validator::make($req->all(), [
            'username'=> 'required|max:30|min:5',
            'password'=> 'required|min:6'
            ]);
        if($validatedData->fails()){
            return response()->json()([
                $validatedData->errors(),422
            ]);
        }
        else{
            $user = new User();
            $user->username = $req->username;
            $user->password = bcrypt($req->password);
            $results=$user->save();
            if($results){
                return "register ok";
            }else{
                return "register not ok";
            }
        }
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60 * 24
        ]);
    }
    protected function guard(){
        return Auth::guard();
    }
}
