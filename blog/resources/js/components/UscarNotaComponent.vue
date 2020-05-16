<template>
    <div class="container">
        
         <form action="" @submit.prevent="agregar" v-if="formulario">
        <input type="text" placeholder="ingrese nombre" class="form-control" v-model="tarea.nombre">
         <input type="text" placeholder="ingrese nombre" class="form-control mt-3" v-model="tarea.descripcion">
         <button class="btn btn-success mt-3" type="submit">Agregar</button>
         <button class="btn btn-danger mt-3">Eliminar</button>
      </form>

      <form action="" @submit.prevent="editar(tarea)" v-if="!formulario">
        <input type="text" placeholder="ingrese nombre" class="form-control" v-model="tarea.nombre">
         <input type="text" placeholder="ingrese nombre" class="form-control mt-3" v-model="tarea.descripcion">
         <button class="btn btn-warning mt-3 " type="submit">Editar</button>
         <button class="btn btn-danger mt-3">Eliminar</button>
      </form>
       <table class="table mt-5 table-dark table-hover">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">nombre</th>
      <th scope="col">descripcion</th>
      <th scope="col">Operaciones</th>
    </tr>
  </thead>
  <tbody v-for="(item,index) in dess" :key="index">
    <tr>

      <th scope="row">{{item.id}}</th>
      <td>{{item.nombre}}</td>
      <td>{{item.descripcion}}</td>
      <td>
          <button class="btn btn-danger" @click="eliminar(item ,index)">Eliminar</button>
          <button class="btn btn-warning" @click="cambio(item)">Editar</button>
      </td>
       <span class="badge badge-primary float-right">
            {{item.updated_at}}
       </span>    
    </tr>
  </tbody>
</table>
    
    </div>
</template>
<script>
    export default {
        data(){
            return{
                dess:[],
                tarea:{nombre:'',descripcion: ''},
                formulario:true
                
            }
        },
        methods:{
            mostrar(){
                axios.get('/notas')
                .then(res =>{
                    this.dess = res.data;
                })

            },
            eliminar(item,index){
                axios.delete(`/notas/${item.id}`)
                .then(()=>{
                    this.dess.splice(index,1);
                    alert ("Nota Eliminada Correctamente !!!")
                })

            },
            cambio(item){
                this.formulario=false;
                this.tarea.nombre = item.nombre;
                this.tarea.descripcion= item.descripcion;
                this.tarea.id=item.id;
            },
            editar(tarea){
                const params = {nombre: tarea.nombre, descripcion: tarea.descripcion};
                axios.put(`/notas/${tarea.id}`,params)
                .then(res=>{
                this.formulario = false;
                 const index = this.dess.findIndex(item => item.id === tarea.id);
                this.dess[index] = res.data;
                this.dess[index] = res.data;
                alert("ditado con exito!!!")
                this.formulario = true;
                this.tarea.nombre='',
                this.tarea.descripcion = ''
        })

            },
            agregar(){
                if(this.tarea.nombre.trim() === '' || this.tarea.descripcion.trim() === ''){
                alert('Debes completar todos los campos antes de guardar');
                 return;
            }
            const params = { nombre:this.tarea.nombre, descripcion:this.tarea.descripcion }
                this.tarea.nombre ='',
                this.tarea.descripcion = ''

                axios.post('/notas',params)
                .then(res=>{
                    this.dess.push(res.data);
                    alert("nota agregada");
                })
            }
        },
        created(){
            this.mostrar();
        }
    }
</script>
