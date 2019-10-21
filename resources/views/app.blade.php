@extends('layouts.appScaffold')

@section('content')
    <div id="app" 
        data-viewname={{ !empty($view_name) ? $view_name : ''  }} 
        data-token={{ !empty($token) ? $token : '' }}>
    </div>
@endsection

@section('scripts')
    <script src="{{mix('js/App.js')}}"></script>
@endsection
