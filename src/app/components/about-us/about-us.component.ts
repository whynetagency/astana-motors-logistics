import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }

  articles = [
    {
      title: 'Статья 1',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.',
      image: 'https://placehold.co/500x300'
    },
    {
      title: 'Статья 2',
      excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://placehold.co/500x300'
    },
    {
      title: 'Статья 3',
      excerpt: 'Quisque non erat convallis, vulputate mi id, tincidunt lectus. Ut enim ad minim veniam.',
      image: 'https://placehold.co/500x300'
    },
  ];

  reviews = [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      author: 'Клиент 1'
    },
    {
      text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      author: 'Клиент 2'
    },
  ];

  team = [
    {
      name: 'Иван Иванов',
      position: 'Директор',
      photo: 'https://placehold.co/200x200'
    },
    {
      name: 'Иван Петренко',
      position: 'Менеджер',
      photo: 'https://placehold.co/200x200'
    },
    {
      name: 'Ольга Ольхова',
      position: 'Маркетолог',
      photo: 'https://placehold.co/200x200'
    },
    {
      name: 'Юлия Агапова',
      position: 'HR-менеджер',
      photo: 'https://placehold.co/200x200'
    },
  ];

  fleet = [
    {
      name: 'Автовоз 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      image: 'https://placehold.co/500x300'
    },
    {
      name: 'Автовоз 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image: 'https://placehold.co/500x300'
    },
    {
      name: 'Автовоз 3',
      description: 'Quisque non erat convallis, vulputate mi id, tincidunt lectus.',
      image: 'https://placehold.co/500x300'
    },
  ];

}
