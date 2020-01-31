<template>
    <div class="uploader"
        @dragenter="OnDragEnter"
        @dragleave="OnDragLeave"
        @dragover.prevent
        @drop="onDrop"
        :class="{ dragging: isDragging }">
        
        <!-- <div class="upload-control" v-show="images.length">
            <label for="file"><i class="fa fa-file"></i></label>
            <button @click="upload"><i class="fa fa-upload"></i></button>
        </div>
 -->

        <div v-show="!images.length">
            <i class="fa fa-cloud-upload up"></i>
            <div class="file-input">
                <label for="file">Selecione o arquivo</label>
                <input type="file" id="file" name="file"
                    @change="onInputChange" multiple>
            </div>
        </div>

        <div class="images-preview" v-show="images.length">
            <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                <div id="img" @click="delImages($event)">
                    <img :src="image" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
    data: () => ({
        isDragging: false,
        dragCount: 0,
        files: [],
        images: [],
        imagePost:[],
    }),
    methods: {
        OnDragEnter(e) {
            e.preventDefault();
            
            this.dragCount++;
            this.isDragging = true;

            return false;
        },
        OnDragLeave(e) {
            e.preventDefault();
            this.dragCount--;

            if (this.dragCount <= 0)
                this.isDragging = false;
        },
        onInputChange(e) {
            const files = e.target.files;

            Array.from(files).forEach(file => this.addImage(file));
        },
        onDrop(e) {
            e.preventDefault();
            e.stopPropagation();

            this.isDragging = false;

            const files = e.dataTransfer.files;

            Array.from(files).forEach(file => this.addImage(file));
        },
        addImage(file) {
            if (!file.type.match('image.*')) {
                showError(`${file.name} is not an image`);
                return;
            }

            this.files.push(file);

            // eslint-disable-next-line no-unused-vars
            const img = new Image(),
            reader = new FileReader();

            reader.onload = (e) => this.images.push(e.target.result);

            reader.readAsDataURL(file);

            this.upload()
        },
        getFileSize(size) {
            const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
            let i = 0;
            
            while(size > 900) {
                size /= 1024;
                i++;
            }

            return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
        },
        upload() {
            const formData = new FormData();
            
            this.files.forEach(file => {
                formData.append('file', file, file.name);
            });
            
            axios.post(`${baseApiUrl}/uploads`, formData)
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                    this.imagePost = res.data
                    // eslint-disable-next-line no-console
                    //console.log(this.imagePost.path)
                    this.$emit("loadPhoto",this.imagePost.path)
                })

            
        },
        delImages(event){
            event.preventDefault();
            this.images = [];
            this.files = [];
            document.getElementById('file').value = ''
            this.$emit("loadPhoto", '')
        },
        readImages(){
            // eslint-disable-next-line no-console
            // const photo="6fdf3eeb-152a-4bad-8885-bde104158d8a-papi.jpg"
            // console.log(this.photo)
            /* if (this.photo!=''){
                axios.get(`${baseApiUrl}/users/photo/${photo}`)
                    .then(res => {
                        this.createImage(res.data)
                }) 
            } */
        },
        createImage(files) {
            for (var i=0; i<files.length;i++){
                this.images.push(files[i])
            }
        },
        getImage(file){
           
            this.files.push(file);

            // eslint-disable-next-line no-unused-vars
            const img = new Image(),
            reader = new FileReader();

            reader.onload = (e) => this.images.push(e.target.result);

            reader.readAsDataURL(file); 
        }
    },
    computed: {
         photo:{
             get:function() {
                return this.$store.getters.getPhoto 
             },
             set:function(){
                this.photo = this.$store.getters.getPhoto
             }
        }
    },
   watch:{
        photo(){
            // eslint-disable-next-line no-console
            this.images.push(this.photo)
        }
    }, 
  
    
    

    
}
</script>

<style lang="scss" scoped>
.uploader {
    width: 80%;
    background: #fff;
  //  color: #fff;
    padding: 8px 2px;
    text-align: center;
    border-radius: 50%;
    border: 3px dashed #fff;
    font-size: 20px;
    //position: relative;

    &.dragging {
        background: #fff;
        color: #2196F3;
        border: 3px dashed #2196F3;

        .file-input label {
            background: #2196F3;
            color: #fff;
        }
    }

    .up {
        font-size: 85px;
    }

    .file-input {
        width: 200px;
        margin: auto;
        height: 68px;
        position: relative;
       
        label,
        input {
            background: #2196F3;
            color: #ffff;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 10px;
            border-radius: 4px;
            margin-top: 7px;
            cursor: pointer;
        }

        input {
            opacity: 0;
            z-index: -2;
        }
    }

    .images-preview {
        display: flex;
        flex-wrap: wrap;
        //margin-top: 20px;
            
        .img-wrapper {
            width: 280px;
            //display: flex;
            //flex-direction: column; 
           // margin: 5px;
           // margin-top: 2px;
            //margin-left: 5px;
            height: 180px;
            //justify-content: space-between;
            //background: #fff;
            //box-shadow: 5px 5px 20px #3e3737;

            img {
                max-height: 180px;
              /*   display: block;
                margin-left: auto;
                margin-right: auto; 
               */  border-radius: 50%;
                cursor: pointer;
                //width: 100%;
            }
        }

        /* .details {
            font-size: 12px;
            background: #fff;
            color: #000;
            display: flex;
            flex-direction: column;
            align-items: self-start;
            padding: 3px 6px;

            .name {
                overflow: hidden;
                height: 18px;
            }
        }  */
    }

/*     .upload-control {
        position: absolute;
        width: 60%;
        //background: #fff;
        top: 5px;
        left: 50px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        padding: 25px;
        padding-bottom: 4px;
        text-align: center; 

        button, label {
            background: #2196F3;
            border: 2px solid #03A9F4;
            border-radius: 3px;
            color: #fff;
            font-size: 15px;
            cursor: pointer;
        }

        label {
            padding: 2px 5px;
            margin-right: 10px;
        } 
    } */
}
</style>